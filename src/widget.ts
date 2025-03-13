import {
	Decoration,
	DecorationSet,
	EditorView,
	ViewPlugin,
	ViewUpdate,
	WidgetType,
} from "@codemirror/view";
import { SearchCursor } from "@codemirror/search";
import { App, editorInfoField, MarkdownView, TFile } from "obsidian";
import { EditorState, Range, Text } from "@codemirror/state";
// @ts-ignore - This import is necessary but TypeScript can't find it
import { foldable, syntaxTree, tokenClassNodeProp } from "@codemirror/language";
import { RegExpCursor } from "./regexp-cursor";
import TaskProgressBarPlugin, {
	showPopoverWithProgressBar,
} from "./taskProgressBarIndex";
import { shouldHideProgressBarInLivePriview } from "./utils";

interface Tasks {
	completed: number;
	total: number;
	inProgress?: number;
	abandoned?: number;
	notStarted?: number;
	planned?: number;
}

// Type to represent a text range for safe access
interface TextRange {
	from: number;
	to: number;
}

export interface HTMLElementWithView extends HTMLElement {
	view: EditorView;
}

class TaskProgressBarWidget extends WidgetType {
	progressBarEl: HTMLSpanElement;
	progressBackGroundEl: HTMLDivElement;
	progressEl: HTMLDivElement;
	inProgressEl: HTMLDivElement;
	abandonedEl: HTMLDivElement;
	plannedEl: HTMLDivElement;
	numberEl: HTMLDivElement;

	constructor(
		readonly app: App,
		readonly plugin: TaskProgressBarPlugin,
		readonly view: EditorView,
		readonly from: number,
		readonly to: number,
		readonly completed: number,
		readonly total: number,
		readonly inProgress: number = 0,
		readonly abandoned: number = 0,
		readonly notStarted: number = 0,
		readonly planned: number = 0
	) {
		super();
	}

	eq(other: TaskProgressBarWidget) {
		if (
			this.from === other.from &&
			this.to === other.to &&
			this.inProgress === other.inProgress &&
			this.abandoned === other.abandoned &&
			this.notStarted === other.notStarted &&
			this.planned === other.planned &&
			this.completed === other.completed &&
			this.total === other.total
		) {
			return true;
		}
		return (
			other.completed === this.completed &&
			other.total === this.total &&
			other.inProgress === this.inProgress &&
			other.abandoned === this.abandoned &&
			other.notStarted === this.notStarted &&
			other.planned === this.planned
		);
	}

	changePercentage() {
		if (this.total === 0) return;

		const completedPercentage =
			Math.round((this.completed / this.total) * 10000) / 100;
		const inProgressPercentage =
			Math.round((this.inProgress / this.total) * 10000) / 100;
		const abandonedPercentage =
			Math.round((this.abandoned / this.total) * 10000) / 100;
		const plannedPercentage =
			Math.round((this.planned / this.total) * 10000) / 100;

		// Set the completed part
		this.progressEl.style.width = completedPercentage + "%";

		// Set the in-progress part (if it exists)
		if (this.inProgressEl) {
			this.inProgressEl.style.width = inProgressPercentage + "%";
			this.inProgressEl.style.left = completedPercentage + "%";
		}

		// Set the abandoned part (if it exists)
		if (this.abandonedEl) {
			this.abandonedEl.style.width = abandonedPercentage + "%";
			this.abandonedEl.style.left =
				completedPercentage + inProgressPercentage + "%";
		}

		// Set the planned part (if it exists)
		if (this.plannedEl) {
			this.plannedEl.style.width = plannedPercentage + "%";
			this.plannedEl.style.left =
				completedPercentage +
				inProgressPercentage +
				abandonedPercentage +
				"%";
		}

		// Update the class based on progress percentage
		// This allows for CSS styling based on progress level
		let progressClass = "progress-bar-inline";

		switch (true) {
			case completedPercentage === 0:
				progressClass += " progress-bar-inline-empty";
				break;
			case completedPercentage > 0 && completedPercentage < 25:
				progressClass += " progress-bar-inline-0";
				break;
			case completedPercentage >= 25 && completedPercentage < 50:
				progressClass += " progress-bar-inline-1";
				break;
			case completedPercentage >= 50 && completedPercentage < 75:
				progressClass += " progress-bar-inline-2";
				break;
			case completedPercentage >= 75 && completedPercentage < 100:
				progressClass += " progress-bar-inline-3";
				break;
			case completedPercentage >= 100:
				progressClass += " progress-bar-inline-complete";
				break;
		}

		// Add classes for special states
		if (inProgressPercentage > 0) {
			progressClass += " has-in-progress";
		}
		if (abandonedPercentage > 0) {
			progressClass += " has-abandoned";
		}
		if (plannedPercentage > 0) {
			progressClass += " has-planned";
		}

		this.progressEl.className = progressClass;
	}

	changeNumber() {
		if (this.plugin?.settings.addNumberToProgressBar) {
			let text;
			if (this.plugin?.settings.showPercentage) {
				// Calculate percentage of completed tasks
				const percentage =
					Math.round((this.completed / this.total) * 10000) / 100;

				// Check if custom progress ranges are enabled
				if (this.plugin?.settings.customizeProgressRanges) {
					// Find a matching range for the current percentage
					const matchingRange =
						this.plugin.settings.progressRanges.find(
							(range) =>
								percentage >= range.min &&
								percentage <= range.max
						);

					// If a matching range is found, use its custom text
					if (matchingRange) {
						text = matchingRange.text.replace(
							"{{PROGRESS}}",
							percentage.toString()
						);
					} else {
						text = `${percentage}%`;
					}
				} else {
					text = `${percentage}%`;
				}
			} else {
				// Show detailed counts if we have in-progress, abandoned, or planned tasks
				if (
					this.inProgress > 0 ||
					this.abandoned > 0 ||
					this.planned > 0
				) {
					text = `[${this.completed}✓ ${this.inProgress}⟳ ${this.abandoned}✗ ${this.planned}? / ${this.total}]`;
				} else {
					text = `[${this.completed}/${this.total}]`;
				}
			}

			if (!this.numberEl) {
				this.numberEl = this.progressBarEl.createEl("div", {
					cls: "progress-status",
					text: text,
				});
			} else {
				this.numberEl.innerText = text;
			}
		} else if (this.numberEl) {
			this.numberEl.innerText = `[${this.completed}/${this.total}]`;
		}
	}

	toDOM() {
		if (
			!this.plugin?.settings.addNumberToProgressBar &&
			this.numberEl !== undefined
		) {
			this.numberEl.detach();
		}

		if (this.progressBarEl !== undefined) {
			this.changePercentage();
			if (this.numberEl !== undefined) this.changeNumber();
			return this.progressBarEl;
		}

		this.progressBarEl = createSpan(
			this.plugin?.settings.addNumberToProgressBar
				? "cm-task-progress-bar with-number"
				: "cm-task-progress-bar",
			(el) => {
				el.dataset.completed = this.completed.toString();
				el.dataset.total = this.total.toString();
				el.dataset.inProgress = this.inProgress.toString();
				el.dataset.abandoned = this.abandoned.toString();
				el.dataset.notStarted = this.notStarted.toString();
				el.dataset.planned = this.planned.toString();

				if (this.plugin?.settings.supportHoverToShowProgressInfo) {
					el.onmouseover = () => {
						showPopoverWithProgressBar(this.plugin, {
							progressBar: el,
							data: {
								completed: this.completed.toString(),
								total: this.total.toString(),
								inProgress: this.inProgress.toString(),
								abandoned: this.abandoned.toString(),
								notStarted: this.notStarted.toString(),
								planned: this.planned.toString(),
							},
							view: this.view,
						});
					};
				}
			}
		);
		this.progressBackGroundEl = this.progressBarEl.createEl("div", {
			cls: "progress-bar-inline-background",
		});

		this.progressBackGroundEl.toggleClass(
			"hidden",
			!this.plugin?.settings.showProgressBar
		);

		// Create elements for each status type
		this.progressEl = this.progressBackGroundEl.createEl("div", {
			cls: "progress-bar-inline progress-completed",
		});

		// Only create these elements if we have tasks of these types
		if (this.inProgress > 0) {
			this.inProgressEl = this.progressBackGroundEl.createEl("div", {
				cls: "progress-bar-inline progress-in-progress",
			});
		}

		if (this.abandoned > 0) {
			this.abandonedEl = this.progressBackGroundEl.createEl("div", {
				cls: "progress-bar-inline progress-abandoned",
			});
		}

		if (this.planned > 0) {
			this.plannedEl = this.progressBackGroundEl.createEl("div", {
				cls: "progress-bar-inline progress-planned",
			});
		}

		if (this.plugin?.settings.addNumberToProgressBar && this.total) {
			let text;
			if (this.plugin?.settings.showPercentage) {
				const percentage =
					Math.round((this.completed / this.total) * 10000) / 100;

				// Check if custom progress ranges are enabled
				if (this.plugin?.settings.customizeProgressRanges) {
					// Find a matching range for the current percentage
					const matchingRange =
						this.plugin.settings.progressRanges.find(
							(range) =>
								percentage >= range.min &&
								percentage <= range.max
						);

					// If a matching range is found, use its custom text
					if (matchingRange) {
						text = matchingRange.text.replace(
							"{{PROGRESS}}",
							percentage.toString()
						);
					} else {
						text = `${percentage}%`;
					}
				} else {
					text = `${percentage}%`;
				}
			} else {
				// Show detailed counts if we have in-progress or abandoned tasks
				if (this.inProgress > 0 || this.abandoned > 0) {
					text = `[${this.completed}✓ ${this.inProgress}⟳ ${this.abandoned}✗ / ${this.total}]`;
				} else {
					text = `[${this.completed}/${this.total}]`;
				}
			}

			this.numberEl = this.progressBarEl.createEl("div", {
				cls: "progress-status",
				text: text,
			});
		}

		this.changePercentage();

		return this.progressBarEl;
	}

	ignoreEvent() {
		return false;
	}
}

export function taskProgressBarExtension(
	app: App,
	plugin: TaskProgressBarPlugin
) {
	return ViewPlugin.fromClass(
		class {
			progressDecorations: DecorationSet = Decoration.none;

			constructor(public view: EditorView) {
				let { progress } = this.getDeco(view);
				this.progressDecorations = progress;
			}

			update(update: ViewUpdate) {
				if (update.docChanged || update.viewportChanged) {
					let { progress } = this.getDeco(update.view);
					this.progressDecorations = progress;
				}
			}

			getDeco(view: EditorView): {
				progress: DecorationSet;
			} {
				let { state } = view,
					progressDecos: Range<Decoration>[] = [];

				// Check if progress bars should be hidden based on settings
				if (shouldHideProgressBarInLivePriview(plugin, view)) {
					return {
						progress: Decoration.none,
					};
				}

				for (let part of view.visibleRanges) {
					let taskBulletCursor: RegExpCursor | SearchCursor;
					let headingCursor: RegExpCursor | SearchCursor;
					try {
						taskBulletCursor = new RegExpCursor(
							state.doc,
							"^[\\t|\\s]*([-*+]|\\d+\\.)\\s\\[(.)\\]",
							{},
							part.from,
							part.to
						);
					} catch (err) {
						console.debug(err);
						continue;
					}

					// Process headings if enabled in settings
					if (plugin?.settings.addTaskProgressBarToHeading) {
						try {
							headingCursor = new RegExpCursor(
								state.doc,
								"^(#){1,6} ",
								{},
								part.from,
								part.to
							);
						} catch (err) {
							console.debug(err);
							continue;
						}

						// Process headings
						this.processHeadings(
							headingCursor,
							progressDecos,
							view
						);
					}

					// Process task bullets
					this.processBullets(taskBulletCursor, progressDecos, view);
				}

				return {
					progress: Decoration.set(
						progressDecos.sort((a, b) => a.from - b.from)
					),
				};
			}

			/**
			 * Process heading matches and add decorations
			 */
			private processHeadings(
				cursor: RegExpCursor | SearchCursor,
				decorations: Range<Decoration>[],
				view: EditorView
			) {
				while (!cursor.next().done) {
					let { from, to } = cursor.value;
					const headingLine = view.state.doc.lineAt(from);

					const range = this.calculateRangeForTransform(
						view.state,
						headingLine.from
					);

					if (!range) continue;

					const tasksNum = this.extractTasksFromRange(
						range,
						view.state,
						false
					);

					if (tasksNum.total === 0) continue;

					let startDeco = Decoration.widget({
						widget: new TaskProgressBarWidget(
							app,
							plugin,
							view,
							headingLine.to,
							headingLine.to,
							tasksNum.completed,
							tasksNum.total,
							tasksNum.inProgress || 0,
							tasksNum.abandoned || 0,
							tasksNum.notStarted || 0,
							tasksNum.planned || 0
						),
					});

					decorations.push(
						startDeco.range(headingLine.to, headingLine.to)
					);
				}
			}

			/**
			 * Process bullet matches and add decorations
			 */
			private processBullets(
				cursor: RegExpCursor | SearchCursor,
				decorations: Range<Decoration>[],
				view: EditorView
			) {
				while (!cursor.next().done) {
					let { from } = cursor.value;
					const linePos = view.state.doc.lineAt(from)?.from;

					// Don't parse any tasks in code blocks or frontmatter
					const syntaxNode = syntaxTree(view.state).resolveInner(
						linePos + 1
					);
					const nodeProps = syntaxNode.type.prop(tokenClassNodeProp);
					const excludedSection = [
						"hmd-codeblock",
						"hmd-frontmatter",
					].find((token) => nodeProps?.split(" ").includes(token));

					if (excludedSection) continue;

					const line = view.state.doc.lineAt(linePos);

					// Check if line is a task
					const lineText = this.getDocumentText(
						view.state.doc,
						line.from,
						line.to
					);
					if (
						!lineText ||
						!/^[\s|\t]*([-*+]|\d+\.)\s\[(.)\]/.test(lineText)
					) {
						continue;
					}

					const range = this.calculateRangeForTransform(
						view.state,
						line.to
					);

					if (!range) continue;

					const rangeText = this.getDocumentText(
						view.state.doc,
						range.from,
						range.to
					);
					if (!rangeText || rangeText.length === 1) continue;

					const tasksNum = this.extractTasksFromRange(
						range,
						view.state,
						true
					);

					if (tasksNum.total === 0) continue;

					let startDeco = Decoration.widget({
						widget: new TaskProgressBarWidget(
							app,
							plugin,
							view,
							line.to,
							line.to,
							tasksNum.completed,
							tasksNum.total,
							tasksNum.inProgress || 0,
							tasksNum.abandoned || 0,
							tasksNum.notStarted || 0,
							tasksNum.planned || 0
						),
						side: 1,
					});

					decorations.push(startDeco.range(line.to, line.to));
				}
			}

			/**
			 * Extract tasks count from a document range
			 */
			private extractTasksFromRange(
				range: TextRange,
				state: EditorState,
				isBullet: boolean
			): Tasks {
				const textArray = this.getDocumentTextArray(
					state.doc,
					range.from,
					range.to
				);
				return this.calculateTasksNum(textArray, isBullet);
			}

			/**
			 * Safely extract text from a document range
			 */
			private getDocumentText(
				doc: Text,
				from: number,
				to: number
			): string | null {
				try {
					return doc.sliceString(from, to);
				} catch (e) {
					console.error("Error getting document text:", e);
					return null;
				}
			}

			/**
			 * Get an array of text lines from a document range
			 */
			private getDocumentTextArray(
				doc: Text,
				from: number,
				to: number
			): string[] {
				const text = this.getDocumentText(doc, from, to);
				if (!text) return [];
				return text.split("\n");
			}

			/**
			 * Calculate the foldable range for a position
			 */
			public calculateRangeForTransform(
				state: EditorState,
				pos: number
			): TextRange | null {
				const line = state.doc.lineAt(pos);
				const foldRange = foldable(state, line.from, line.to);

				if (!foldRange) {
					return null;
				}

				return { from: line.from, to: foldRange.to };
			}

			/**
			 * Create regex for counting total tasks
			 */
			private createTotalTaskRegex(
				isHeading: boolean,
				level: number = 0,
				tabSize: number = 4
			): RegExp {
				// Check if we're using only specific marks for counting
				if (plugin?.settings.useOnlyCountMarks) {
					const onlyCountMarks =
						plugin?.settings.onlyCountTaskMarks || "";
					// If onlyCountMarks is empty, return a regex that won't match anything
					if (!onlyCountMarks.trim()) {
						return new RegExp("^$"); // This won't match any tasks
					}

					// Include the specified marks and space (for not started tasks)
					const markPattern = `\\[([ ${onlyCountMarks}])\\]`;

					if (isHeading) {
						// For headings, we'll still match any task format, but filter by indentation level later
						return new RegExp(
							`^[\\t|\\s]*([-*+]|\\d+\\.)\\s${markPattern}`
						);
					} else {
						// If counting sublevels, use a more relaxed regex that matches any indentation
						if (plugin?.settings.countSubLevel) {
							return new RegExp(
								`^[\\t|\\s]*?([-*+]|\\d+\\.)\\s${markPattern}`
							);
						} else {
							// When not counting sublevels, we'll check the actual indentation level separately
							// So the regex should match tasks at any indentation level
							return new RegExp(
								`^[\\t|\\s]*([-*+]|\\d+\\.)\\s${markPattern}`
							);
						}
					}
				}

				// Get excluded task marks
				const excludePattern = plugin?.settings.excludeTaskMarks || "";

				// Build the task marker pattern
				let markPattern = "\\[(.)\\]";

				// If there are excluded marks, modify the pattern
				if (excludePattern && excludePattern.length > 0) {
					// Build a pattern that doesn't match excluded marks
					const excludeChars = excludePattern
						.split("")
						.map((c) => "\\" + c)
						.join("");
					markPattern = `\\[([^${excludeChars}])\\]`;
				}

				if (isHeading) {
					// For headings, we'll still match any task format, but filter by indentation level later
					return new RegExp(
						`^[\\t|\\s]*([-*+]|\\d+\\.)\\s${markPattern}`
					);
				} else {
					// If counting sublevels, use a more relaxed regex
					if (plugin?.settings.countSubLevel) {
						return new RegExp(
							`^[\\t|\\s]*?([-*+]|\\d+\\.)\\s${markPattern}`
						);
					} else {
						// When not counting sublevels, we'll check the actual indentation level separately
						// So the regex should match tasks at any indentation level
						return new RegExp(
							`^[\\t|\\s]*([-*+]|\\d+\\.)\\s${markPattern}`
						);
					}
				}
			}

			/**
			 * Create regex for matching completed tasks
			 */
			private createCompletedTaskRegex(
				plugin: TaskProgressBarPlugin,
				isHeading: boolean,
				level: number = 0,
				tabSize: number = 4
			): RegExp {
				// Extract settings
				const useOnlyCountMarks = plugin?.settings.useOnlyCountMarks;
				const onlyCountPattern =
					plugin?.settings.onlyCountTaskMarks || "x|X";

				// If onlyCountMarks is enabled but the pattern is empty, return a regex that won't match anything
				if (useOnlyCountMarks && !onlyCountPattern.trim()) {
					return new RegExp("^$"); // This won't match any tasks
				}

				const excludePattern = plugin?.settings.excludeTaskMarks || "";
				const completedMarks =
					plugin?.settings.taskStatuses?.completed || "x|X";

				// Default patterns - adjust for sublevel counting
				const basePattern = isHeading
					? "^[\\t|\\s]*" // For headings, match any indentation (will be filtered later)
					: plugin?.settings.countSubLevel
					? "^[\\t|\\s]*?" // For sublevel counting, use non-greedy match for any indentation
					: "^[\\t|\\s]*"; // For no sublevel counting, still match any indentation level

				const bulletPrefix = isHeading
					? "([-*+]|\\d+\\.)\\s" // For headings, just match the bullet
					: plugin?.settings.countSubLevel
					? "([-*+]|\\d+\\.)\\s" // Simplified prefix for sublevel counting
					: "([-*+]|\\d+\\.)\\s"; // For no sublevel counting, just match the bullet

				// If "only count specific marks" is enabled
				if (useOnlyCountMarks) {
					return new RegExp(
						basePattern +
							bulletPrefix +
							"\\[(" +
							onlyCountPattern +
							")\\]"
					);
				}

				// When using the completed task marks
				if (excludePattern) {
					// Filter completed marks based on exclusions
					const completedMarksArray = completedMarks.split("|");
					const excludeMarksArray = excludePattern.split("");
					const filteredMarks = completedMarksArray
						.filter((mark) => !excludeMarksArray.includes(mark))
						.join("|");

					return new RegExp(
						basePattern +
							bulletPrefix +
							"\\[(" +
							filteredMarks +
							")\\]"
					);
				} else {
					return new RegExp(
						basePattern +
							bulletPrefix +
							"\\[(" +
							completedMarks +
							")\\]"
					);
				}
			}

			/**
			 * Check if a task should be counted as completed
			 */
			private isCompletedTask(text: string): boolean {
				const markMatch = text.match(/\[(.)]/);
				if (!markMatch || !markMatch[1]) {
					return false;
				}

				const mark = markMatch[1];

				// Priority 1: If useOnlyCountMarks is enabled, only count tasks with specified marks
				if (plugin?.settings.useOnlyCountMarks) {
					const onlyCountMarks =
						plugin?.settings.onlyCountTaskMarks.split("|");
					return onlyCountMarks.includes(mark);
				}

				// Priority 2: If the mark is in excludeTaskMarks, don't count it
				if (
					plugin?.settings.excludeTaskMarks &&
					plugin.settings.excludeTaskMarks.includes(mark)
				) {
					return false;
				}

				// Priority 3: Check against the task statuses
				// We consider a task "completed" if it has a mark from the "completed" status
				const completedMarks =
					plugin?.settings.taskStatuses?.completed?.split("|") || [
						"x",
						"X",
					];

				// Return true if the mark is in the completedMarks array
				return completedMarks.includes(mark);
			}

			/**
			 * Get the task status of a task
			 */
			private getTaskStatus(
				text: string
			):
				| "completed"
				| "inProgress"
				| "abandoned"
				| "notStarted"
				| "planned" {
				const markMatch = text.match(/\[(.)]/);
				if (!markMatch || !markMatch[1]) {
					return "notStarted";
				}

				const mark = markMatch[1];
				// Priority 1: If useOnlyCountMarks is enabled
				if (plugin?.settings.useOnlyCountMarks) {
					const onlyCountMarks =
						plugin?.settings.onlyCountTaskMarks.split("|");
					if (onlyCountMarks.includes(mark)) {
						return "completed";
					} else {
						// If using onlyCountMarks and the mark is not in the list,
						// determine which other status it belongs to
						return this.determineNonCompletedStatus(mark);
					}
				}

				// Priority 2: If the mark is in excludeTaskMarks
				if (
					plugin?.settings.excludeTaskMarks &&
					plugin.settings.excludeTaskMarks.includes(mark)
				) {
					// Excluded marks are considered not started
					return "notStarted";
				}

				// Priority 3: Check against specific task statuses
				return this.determineTaskStatus(mark);
			}

			/**
			 * Helper to determine the non-completed status of a task mark
			 */
			private determineNonCompletedStatus(
				mark: string
			): "inProgress" | "abandoned" | "notStarted" | "planned" {
				const inProgressMarks =
					plugin?.settings.taskStatuses?.inProgress?.split("|") || [
						"-",
						"/",
					];

				if (inProgressMarks.includes(mark)) {
					return "inProgress";
				}

				const abandonedMarks =
					plugin?.settings.taskStatuses?.abandoned?.split("|") || [
						">",
					];
				if (abandonedMarks.includes(mark)) {
					return "abandoned";
				}

				const plannedMarks =
					plugin?.settings.taskStatuses?.planned?.split("|") || ["?"];
				if (plannedMarks.includes(mark)) {
					return "planned";
				}

				// If the mark doesn't match any specific category, use the countOtherStatusesAs setting
				return (
					(plugin?.settings.countOtherStatusesAs as
						| "inProgress"
						| "abandoned"
						| "notStarted"
						| "planned") || "notStarted"
				);
			}

			/**
			 * Helper to determine the specific status of a task mark
			 */
			private determineTaskStatus(
				mark: string
			):
				| "completed"
				| "inProgress"
				| "abandoned"
				| "notStarted"
				| "planned" {
				const completedMarks =
					plugin?.settings.taskStatuses?.completed?.split("|") || [
						"x",
						"X",
					];
				if (completedMarks.includes(mark)) {
					return "completed";
				}

				const inProgressMarks =
					plugin?.settings.taskStatuses?.inProgress?.split("|") || [
						"-",
						"/",
					];
				if (inProgressMarks.includes(mark)) {
					return "inProgress";
				}

				const abandonedMarks =
					plugin?.settings.taskStatuses?.abandoned?.split("|") || [
						">",
					];
				if (abandonedMarks.includes(mark)) {
					return "abandoned";
				}

				const plannedMarks =
					plugin?.settings.taskStatuses?.planned?.split("|") || ["?"];
				if (plannedMarks.includes(mark)) {
					return "planned";
				}

				// If not matching any specific status, check if it's a not-started mark
				const notStartedMarks =
					plugin?.settings.taskStatuses?.notStarted?.split("|") || [
						" ",
					];
				if (notStartedMarks.includes(mark)) {
					return "notStarted";
				}

				// If we get here, the mark doesn't match any of our defined categories
				// Use the countOtherStatusesAs setting to determine how to count it
				return (
					(plugin?.settings.countOtherStatusesAs as
						| "completed"
						| "inProgress"
						| "abandoned"
						| "notStarted"
						| "planned") || "notStarted"
				);
			}

			/**
			 * Check if a task marker should be excluded from counting
			 */
			private shouldExcludeTask(text: string): boolean {
				// If no exclusion settings, return false
				if (
					!plugin?.settings.excludeTaskMarks ||
					plugin.settings.excludeTaskMarks.length === 0
				) {
					return false;
				}

				// Check if task mark is in the exclusion list
				const taskMarkMatch = text.match(/\[(.)]/);
				if (taskMarkMatch && taskMarkMatch[1]) {
					const taskMark = taskMarkMatch[1];
					return plugin.settings.excludeTaskMarks.includes(taskMark);
				}

				return false;
			}

			/**
			 * Get tab size from vault configuration
			 */
			private getTabSize(): number {
				try {
					const vaultConfig = app.vault as any;
					const useTab =
						vaultConfig.getConfig?.("useTab") === undefined ||
						vaultConfig.getConfig?.("useTab") === true;
					return useTab
						? (vaultConfig.getConfig?.("tabSize") || 4) / 4
						: vaultConfig.getConfig?.("tabSize") || 4;
				} catch (e) {
					console.error("Error getting tab size:", e);
					return 4; // Default tab size
				}
			}

			public calculateTasksNum(
				textArray: string[],
				bullet: boolean
			): Tasks {
				if (!textArray || textArray.length === 0) {
					return {
						completed: 0,
						total: 0,
						inProgress: 0,
						abandoned: 0,
						notStarted: 0,
						planned: 0,
					};
				}

				// Check if the next line has the same indentation as the first line
				// If so, return zero tasks
				if (textArray.length > 1) {
					const firstLineIndent =
						textArray[0].match(/^[\s|\t]*/)?.[0] || "";
					const secondLineIndent =
						textArray[1].match(/^[\s|\t]*/)?.[0] || "";

					if (firstLineIndent === secondLineIndent) {
						return {
							completed: 0,
							total: 0,
							inProgress: 0,
							abandoned: 0,
							notStarted: 0,
							planned: 0,
						};
					}
				}

				let completed: number = 0;
				let inProgress: number = 0;
				let abandoned: number = 0;
				let notStarted: number = 0;
				let planned: number = 0;
				let total: number = 0;
				let level: number = 0;

				// Get tab size from vault config
				const tabSize = this.getTabSize();

				// For debugging - collect task marks and their statuses
				const taskDebug: {
					mark: string;
					status: string;
					lineText: string;
				}[] = [];

				// Determine indentation level for bullets
				if (!plugin?.settings.countSubLevel && bullet && textArray[0]) {
					const indentMatch = textArray[0].match(/^[\s|\t]*/);
					if (indentMatch) {
						level = indentMatch[0].length / tabSize;
					}
				}

				// Create regexes based on settings and context
				const bulletTotalRegex = this.createTotalTaskRegex(
					false,
					level,
					tabSize
				);

				const headingTotalRegex = this.createTotalTaskRegex(true);

				// Count tasks
				for (let i = 0; i < textArray.length; i++) {
					if (i === 0) continue; // Skip the first line

					if (bullet) {
						const lineText = textArray[i];
						const lineTextTrimmed = lineText.trim();

						// If countSubLevel is false, check the indentation level directly
						if (!plugin?.settings.countSubLevel) {
							const indentMatch = lineText.match(/^[\s|\t]*/);
							const lineLevel = indentMatch
								? indentMatch[0].length / tabSize
								: 0;

							// Only count this task if it's exactly one level deeper
							if (lineLevel !== level + 1) {
								continue;
							}
						}

						// First check if it matches task format, then check if it should be excluded
						if (
							lineTextTrimmed &&
							lineText.match(bulletTotalRegex) &&
							!this.shouldExcludeTask(lineTextTrimmed)
						) {
							total++;
							// Get the task status
							const status = this.getTaskStatus(lineTextTrimmed);

							// Extract the mark for debugging
							const markMatch = lineTextTrimmed.match(/\[(.)]/);
							if (markMatch && markMatch[1]) {
								taskDebug.push({
									mark: markMatch[1],
									status: status,
									lineText: lineTextTrimmed,
								});
							}

							// Count based on status
							if (status === "completed") {
								completed++;
							} else if (status === "inProgress") {
								inProgress++;
							} else if (status === "abandoned") {
								abandoned++;
							} else if (status === "planned") {
								planned++;
							} else if (status === "notStarted") {
								notStarted++;
							}
						}
					} else if (plugin?.settings.addTaskProgressBarToHeading) {
						const lineText = textArray[i];
						const lineTextTrimmed = lineText.trim();

						// For headings, if countSubLevel is false, only count top-level tasks (no indentation)
						if (!plugin?.settings.countSubLevel) {
							const indentMatch = lineText.match(/^[\s|\t]*/);
							const lineLevel = indentMatch
								? indentMatch[0].length / tabSize
								: 0;

							// For headings, only count tasks with no indentation when countSubLevel is false
							if (lineLevel !== 0) {
								continue;
							}
						}

						// Also use shouldExcludeTask for additional validation
						if (
							lineTextTrimmed &&
							lineText.match(headingTotalRegex) &&
							!this.shouldExcludeTask(lineTextTrimmed)
						) {
							total++;
							// Get the task status
							const status = this.getTaskStatus(lineTextTrimmed);

							// Extract the mark for debugging
							const markMatch = lineTextTrimmed.match(/\[(.)]/);
							if (markMatch && markMatch[1]) {
								taskDebug.push({
									mark: markMatch[1],
									status: status,
									lineText: lineTextTrimmed,
								});
							}

							// Count based on status
							if (status === "completed") {
								completed++;
							} else if (status === "inProgress") {
								inProgress++;
							} else if (status === "abandoned") {
								abandoned++;
							} else if (status === "planned") {
								planned++;
							} else if (status === "notStarted") {
								notStarted++;
							}
						}
					}
				}

				// Ensure counts don't exceed total
				completed = Math.min(completed, total);
				inProgress = Math.min(inProgress, total - completed);
				abandoned = Math.min(abandoned, total - completed - inProgress);
				planned = Math.min(
					planned,
					total - completed - inProgress - abandoned
				);
				notStarted =
					total - completed - inProgress - abandoned - planned;

				return {
					completed,
					total,
					inProgress,
					abandoned,
					notStarted,
					planned,
				};
			}
		},
		{
			provide: (plugin) => [
				EditorView.decorations.of(
					(v) =>
						v.plugin(plugin)?.progressDecorations || Decoration.none
				),
			],
		}
	);
}
