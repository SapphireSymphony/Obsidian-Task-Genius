/**
 * Manager for task indexing web workers
 */

import { Component, ListItemCache, MetadataCache, TFile, Vault } from "obsidian";
import { Task } from "../types/TaskIndex";
import {
	ErrorResult,
	IndexerResult,
	ParseTasksCommand,
	TaskParseResult,
} from "./TaskIndexWorkerMessage";

// Import worker and utilities
// @ts-ignore Ignore type error for worker import
import TaskWorker from "./TaskIndex.worker";
import { Deferred, deferred } from "./deferred";

// Using similar queue structure as importer.ts
import { Queue } from "@datastructures-js/queue";

/**
 * Options for worker pool
 */
export interface WorkerPoolOptions {
	/** Maximum number of workers to use */
	maxWorkers: number;
	/** Target CPU utilization (0.1 to 1.0) */
	cpuUtilization: number;
	/** Whether to enable debug logging */
	debug?: boolean;
}

/**
 * Default worker pool options
 */
export const DEFAULT_WORKER_OPTIONS: WorkerPoolOptions = {
	maxWorkers: 2,
	cpuUtilization: 0.75,
	debug: false,
};

/**
 * Task priority levels
 */
enum TaskPriority {
	HIGH = 0,   // 高优先级 - 用于初始化和用户交互任务
	NORMAL = 1, // 普通优先级 - 用于标准的文件索引更新
	LOW = 2,    // 低优先级 - 用于批量后台任务
}

/**
 * A worker in the pool of executing workers
 */
interface PoolWorker {
	/** The id of this worker */
	id: number;
	/** The raw underlying worker */
	worker: Worker;
	/** UNIX time indicating the next time this worker is available for execution */
	availableAt: number;
	/** The active task this worker is processing, if any */
	active?: [TFile, Deferred<any>, number, TaskPriority];
}

/**
 * Task metadata from Obsidian cache
 */
interface TaskMetadata {
	/** List item cache information */
	listItems?: ListItemCache[];
	/** Raw file content */
	content: string;
	/** File stats */
	stats: {
		ctime: number;
		mtime: number;
		size: number;
	};
}

/**
 * Queue item with priority
 */
interface QueueItem {
	file: TFile;
	promise: Deferred<any>;
	priority: TaskPriority;
}

/**
 * Worker pool for task processing
 */
export class TaskWorkerManager extends Component {
	/** Worker pool */
	private workers: Map<number, PoolWorker> = new Map();
	/** Prioritized task queues */
	private queues: Queue<QueueItem>[] = [
		new Queue<QueueItem>(), // 高优先级队列
		new Queue<QueueItem>(), // 普通优先级队列
		new Queue<QueueItem>(), // 低优先级队列
	];
	/** Map of outstanding tasks by file path */
	private outstanding: Map<string, Promise<any>> = new Map();
	/** Whether the pool is currently active */
	private active: boolean = true;
	/** Worker pool options */
	private options: WorkerPoolOptions;
	/** Vault instance */
	private vault: Vault;
	/** Metadata cache for accessing file metadata */
	private metadataCache: MetadataCache;
	/** Next worker ID to assign */
	private nextWorkerId: number = 0;
	/** Tracking progress for large operations */
	private processedFiles: number = 0;
	private totalFilesToProcess: number = 0;
	/** Whether we're currently processing a large batch */
	private isProcessingBatch: boolean = false;
	/** Maximum number of retry attempts for a task */
	private maxRetries: number = 2;

	/**
	 * Create a new worker pool
	 */
	constructor(vault: Vault, metadataCache: MetadataCache, options: Partial<WorkerPoolOptions> = {}) {
		super();
		this.options = { ...DEFAULT_WORKER_OPTIONS, ...options };
		this.vault = vault;
		this.metadataCache = metadataCache;

		// Initialize workers up to max
		this.initializeWorkers();
	}

	/**
	 * Initialize workers in the pool
	 */
	private initializeWorkers(): void {
		const workerCount = Math.min(
			this.options.maxWorkers,
			navigator.hardwareConcurrency || 2
		);

		for (let i = 0; i < workerCount; i++) {
			try {
				const worker = this.newWorker();
				this.workers.set(worker.id, worker);
				this.log(`Initialized worker #${worker.id}`);
			} catch (error) {
				console.error("Failed to initialize worker:", error);
			}
		}

		this.log(
			`Initialized ${this.workers.size} workers (requested ${workerCount})`
		);

		// Check if we have any workers
		if (this.workers.size === 0) {
			console.warn(
				"No workers could be initialized, falling back to main thread processing"
			);
		}
	}

	/**
	 * Create a new worker
	 */
	private newWorker(): PoolWorker {
		const worker: PoolWorker = {
			id: this.nextWorkerId++,
			worker: new TaskWorker(),
			availableAt: Date.now(),
		};

		worker.worker.onmessage = (evt: MessageEvent) => this.finish(worker, evt.data);
		worker.worker.onerror = (event: ErrorEvent) => {
			console.error("Worker error:", event);
			
			// If there's an active task, retry or reject it
			if (worker.active) {
				const [file, promise, retries, priority] = worker.active;
				
				if (retries < this.maxRetries) {
					// Retry the task
					this.log(`Retrying task for ${file.path} (attempt ${retries + 1})`);
					this.queueTaskWithPriority(file, promise, priority, retries + 1);
				} else {
					// Max retries reached, reject the promise
					promise.reject("Worker error after max retries");
				}
				
				worker.active = undefined;
				this.schedule();
			}
		};

		return worker;
	}

	/**
	 * Process a single file for tasks
	 */
	public processFile(file: TFile, priority: TaskPriority = TaskPriority.NORMAL): Promise<Task[]> {
		// De-bounce repeated requests for the same file
		let existing = this.outstanding.get(file.path);
		if (existing) return existing;

		let promise = deferred<Task[]>();
		this.outstanding.set(file.path, promise);
		
		this.queueTaskWithPriority(file, promise, priority);
		return promise;
	}
	
	/**
	 * Queue a task with specified priority
	 */
	private queueTaskWithPriority(file: TFile, promise: Deferred<Task[]>, priority: TaskPriority, retries: number = 0): void {
		this.queues[priority].enqueue({
			file,
			promise,
			priority
		});
		
		// If this is the first retry, schedule immediately
		if (retries === 0) {
			this.schedule();
		}
	}

	/**
	 * Process multiple files in a batch
	 */
	public async processBatch(files: TFile[], priority: TaskPriority = TaskPriority.HIGH): Promise<Map<string, Task[]>> {
		if (files.length === 0) {
			return new Map<string, Task[]>();
		}
		
		this.isProcessingBatch = true;
		this.processedFiles = 0;
		this.totalFilesToProcess = files.length;
		
		this.log(`Processing batch of ${files.length} files`);
		
		// 创建一个结果映射
		const resultMap = new Map<string, Task[]>();
		
		// 将文件分成更小的批次，避免一次性提交太多任务
		const subBatchSize = 10;
		
		for (let i = 0; i < files.length; i += subBatchSize) {
			const subBatch = files.slice(i, i + subBatchSize);
			
			// 为每个文件创建Promise
			const promises: Promise<Task[]>[] = [];
			
			// 队列每个文件供处理，使用指定的优先级
			for (const file of subBatch) {
				promises.push(this.processFile(file, priority));
			}
			
			// 等待所有子批次文件处理完成
			try {
				const results = await Promise.all(promises);
				
				// 将结果添加到结果映射
				subBatch.forEach((file, index) => {
					resultMap.set(file.path, results[index]);
				});
				
				// 更新进度
				this.processedFiles += subBatch.length;
				const progress = Math.round((this.processedFiles / this.totalFilesToProcess) * 100);
				if (progress % 10 === 0) {
					this.log(`Batch progress: ${progress}% (${this.processedFiles}/${this.totalFilesToProcess})`);
				}
				
				// 在批次间稍作等待，避免阻塞UI
				if (i + subBatchSize < files.length) {
					await new Promise(resolve => setTimeout(resolve, 5));
				}
			} catch (error) {
				console.error(`Error processing sub-batch:`, error);
				// 继续处理下一个子批次
			}
		}
		
		this.isProcessingBatch = false;
		this.log(`Completed batch processing of ${files.length} files`);
		return resultMap;
	}

	/**
	 * Get task metadata from the file and Obsidian cache
	 */
	private async getTaskMetadata(file: TFile): Promise<TaskMetadata> {
		// Get file content
		const content = await this.vault.cachedRead(file);
		
		// Get file metadata from Obsidian cache
		const fileCache = this.metadataCache.getFileCache(file);
		
		return {
			listItems: fileCache?.listItems,
			content,
			stats: {
				ctime: file.stat.ctime,
				mtime: file.stat.mtime,
				size: file.stat.size,
			}
		};
	}

	/**
	 * Execute next task from the queue
	 */
	private schedule(): void {
		if (!this.active) return;
		
		// 检查所有队列，按优先级从高到低获取任务
		let queueItem: QueueItem | undefined;
		
		for (let priority = 0; priority < this.queues.length; priority++) {
			if (!this.queues[priority].isEmpty()) {
				queueItem = this.queues[priority].dequeue();
				break;
			}
		}
		
		if (!queueItem) return; // 所有队列都为空
		
		const worker = this.availableWorker();
		if (!worker) {
			// 没有可用的工作线程，将任务重新入队
			this.queues[queueItem.priority].enqueue(queueItem);
			return;
		}

		const { file, promise, priority } = queueItem;
		worker.active = [file, promise, 0, priority]; // 0 表示重试次数

		try {
			this.getTaskMetadata(file).then(metadata => {
				const command: ParseTasksCommand = {
					type: "parseTasks",
					filePath: file.path,
					content: metadata.content,
					stats: metadata.stats,
					metadata: {
						listItems: metadata.listItems || [],
						fileCache: this.metadataCache.getFileCache(file) || undefined
					}
				};
				
				worker.worker.postMessage(command);
			}).catch(error => {
				console.error(`Error reading file ${file.path}:`, error);
				promise.reject(error);
				worker.active = undefined;
				
				// 移除未完成的任务
				this.outstanding.delete(file.path);
				
				// 处理下一个任务
				this.schedule();
			});
		} catch (error) {
			console.error(`Error processing file ${file.path}:`, error);
			promise.reject(error);
			worker.active = undefined;
			
			// 移除未完成的任务
			this.outstanding.delete(file.path);
			
			// 处理下一个任务
			this.schedule();
		}
	}

	/**
	 * Handle worker completion and process result
	 */
	private finish(worker: PoolWorker, data: IndexerResult): void {
		if (!worker.active) {
			console.log(
				"Received a stale worker message. Ignoring.",
				data
			);
			return;
		}

		const [file, promise, retries, priority] = worker.active;

		// Resolve or reject the promise based on result
		if (data.type === "error") {
			// 错误处理 - 如果没有超过重试次数，重试
			const errorResult = data as ErrorResult;
			
			if (retries < this.maxRetries) {
				this.log(`Retrying task for ${file.path} due to error: ${errorResult.error}`);
				this.queueTaskWithPriority(file, promise, priority, retries + 1);
			} else {
				promise.reject(new Error(errorResult.error));
				this.outstanding.delete(file.path);
			}
		} else if (data.type === "parseResult") {
			const parseResult = data as TaskParseResult;
			promise.resolve(parseResult.tasks);
			this.outstanding.delete(file.path);
		} else if (data.type === "batchResult") {
			// For batch results, we handle differently as we don't have tasks directly
			promise.reject(new Error("Batch results should be handled by processBatch"));
			this.outstanding.delete(file.path);
		} else {
			promise.reject(new Error(`Unexpected result type: ${(data as any).type}`));
			this.outstanding.delete(file.path);
		}

		// Check if we should remove this worker (if we're over capacity)
		if (this.workers.size > this.options.maxWorkers) {
			this.workers.delete(worker.id);
			this.terminate(worker);
		} else {
			// Calculate delay based on CPU utilization target
			const now = Date.now();
			const processingTime = worker.active ? (now - worker.availableAt) : 0;
			const throttle = Math.max(0.1, this.options.cpuUtilization) - 1.0;
			const delay = Math.max(0, processingTime * throttle);

			worker.active = undefined;

			if (delay <= 0) {
				worker.availableAt = now;
				this.schedule();
			} else {
				worker.availableAt = now + delay;
				setTimeout(() => this.schedule(), delay);
			}
		}
	}

	/**
	 * Get an available worker
	 */
	private availableWorker(): PoolWorker | undefined {
		const now = Date.now();
		
		// Find a worker that's not busy and is available
		for (const worker of this.workers.values()) {
			if (!worker.active && worker.availableAt <= now) {
				return worker;
			}
		}

		// Create a new worker if we haven't reached capacity
		if (this.workers.size < this.options.maxWorkers) {
			const worker = this.newWorker();
			this.workers.set(worker.id, worker);
			return worker;
		}

		return undefined;
	}

	/**
	 * Terminate a worker
	 */
	private terminate(worker: PoolWorker): void {
		worker.worker.terminate();
		
		if (worker.active) {
			worker.active[1].reject("Terminated");
			worker.active = undefined;
		}
		
		this.log(`Terminated worker #${worker.id}`);
	}

	/**
	 * Reset throttling for all workers
	 */
	public unthrottle(): void {
		const now = Date.now();
		for (const worker of this.workers.values()) {
			worker.availableAt = now;
		}
		this.schedule();
	}

	/**
	 * Shutdown the worker pool
	 */
	public onunload(): void {
		this.active = false;

		// Terminate all workers
		for (const worker of this.workers.values()) {
			this.terminate(worker);
			this.workers.delete(worker.id);
		}

		// Clear all remaining queued tasks and reject their promises
		for (const queue of this.queues) {
			while (!queue.isEmpty()) {
				const queueItem = queue.dequeue();
				if (queueItem) {
					queueItem.promise.reject("Terminated");
					this.outstanding.delete(queueItem.file.path);
				}
			}
		}

		this.log("Worker pool shut down");
	}

	/**
	 * Get the number of pending tasks
	 */
	public getPendingTaskCount(): number {
		return this.queues.reduce((total, queue) => total + queue.size(), 0);
	}
	
	/**
	 * Get the current batch processing progress
	 */
	public getBatchProgress(): { current: number, total: number, percentage: number } {
		return {
			current: this.processedFiles,
			total: this.totalFilesToProcess,
			percentage: this.totalFilesToProcess > 0 
				? Math.round((this.processedFiles / this.totalFilesToProcess) * 100) 
				: 0
		};
	}
	
	/**
	 * Check if the worker pool is currently processing a batch
	 */
	public isProcessingBatchTask(): boolean {
		return this.isProcessingBatch;
	}

	/**
	 * Log a message if debugging is enabled
	 */
	private log(message: string): void {
		if (this.options.debug) {
			console.log(`[TaskWorkerManager] ${message}`);
		}
	}
}
