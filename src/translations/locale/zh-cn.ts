// Simplified Chinese translations
const translations = {
	"Comprehensive task management plugin for Obsidian with progress bars, task status cycling, and advanced task tracking features.":
		"全面的 Obsidian 任务管理插件，具有进度条、任务状态循环和高级任务跟踪功能。",
	"Show progress bar": "显示进度条",
	"Toggle this to show the progress bar.": "切换此选项以显示进度条。",
	"Support hover to show progress info": "支持悬停显示进度信息",
	"Toggle this to allow this plugin to show progress info when hovering over the progress bar.":
		"切换此选项以允许插件在鼠标悬停在进度条上时显示进度信息。",
	"Add progress bar to non-task bullet": "为非任务项添加进度条",
	"Toggle this to allow adding progress bars to regular list items (non-task bullets).":
		"切换此选项以允许为常规列表项（非任务项）添加进度条。",
	"Add progress bar to Heading": "为标题添加进度条",
	"Toggle this to allow this plugin to add progress bar for Task below the headings.":
		"切换此选项以允许插件为标题下的任务添加进度条。",
	"Enable heading progress bars": "启用标题进度条",
	"Add progress bars to headings to show progress of all tasks under that heading.":
		"为标题添加进度条以显示该标题下所有任务的进度。",
	"Auto complete parent task": "自动完成父任务",
	"Toggle this to allow this plugin to auto complete parent task when all child tasks are completed.":
		"切换此选项以允许插件在所有子任务完成时自动完成父任务。",
	"Mark parent as 'In Progress' when partially complete":
		'部分完成时将父任务标记为"进行中"',
	"When some but not all child tasks are completed, mark the parent task as 'In Progress'. Only works when 'Auto complete parent' is enabled.":
		'当部分子任务完成但不是全部时，将父任务标记为"进行中"。仅在启用"自动完成父任务"时有效。',
	"Count sub children level of current Task": "计算当前任务的子任务层级",
	"Toggle this to allow this plugin to count sub tasks.":
		"切换此选项以允许插件计算子任务。",
	"Task Status Settings": "任务状态设置",
	"Select a predefined task status collection or customize your own":
		"选择预定义的任务状态集合或自定义您自己的",
	"Completed task markers": "已完成任务标记",
	'Characters in square brackets that represent completed tasks. Example: "x|X"':
		'方括号中表示已完成任务的字符。例如："x|X"',
	"Planned task markers": "计划任务标记",
	'Characters in square brackets that represent planned tasks. Example: "?"':
		'方括号中表示计划任务的字符。例如："?"',
	"In progress task markers": "进行中任务标记",
	'Characters in square brackets that represent tasks in progress. Example: ">|/"':
		'方括号中表示进行中任务的字符。例如：">|/"',
	"Abandoned task markers": "已放弃任务标记",
	'Characters in square brackets that represent abandoned tasks. Example: "-"':
		'方括号中表示已放弃任务的字符。例如："-"',
	'Characters in square brackets that represent not started tasks. Default is space " "':
		'方括号中表示未开始任务的字符。默认为空格 " "',
	"Count other statuses as": "将其他状态计为",
	'Select the status to count other statuses as. Default is "Not Started".':
		'选择将其他状态计为哪种状态。默认为"未开始"。',
	"Task Counting Settings": "任务计数设置",
	"Exclude specific task markers": "排除特定任务标记",
	'Specify task markers to exclude from counting. Example: "?|/"':
		'指定要从计数中排除的任务标记。例如："?|/"',
	"Only count specific task markers": "仅计数特定任务标记",
	"Toggle this to only count specific task markers":
		"切换此选项以仅计数特定任务标记",
	"Specific task markers to count": "要计数的特定任务标记",
	'Specify which task markers to count. Example: "x|X|>|/"':
		'指定要计数的任务标记。例如："x|X|>|/"',
	"Conditional Progress Bar Display": "条件进度条显示",
	"Hide progress bars based on conditions": "基于条件隐藏进度条",
	"Toggle this to enable hiding progress bars based on tags, folders, or metadata.":
		"切换此选项以启用基于标签、文件夹或元数据隐藏进度条。",
	"Hide by tags": "按标签隐藏",
	'Specify tags that will hide progress bars (comma-separated, without #). Example: "no-progress-bar,hide-progress"':
		'指定将隐藏进度条的标签（逗号分隔，不带 #）。例如："no-progress-bar,hide-progress"',
	"Hide by folders": "按文件夹隐藏",
	'Specify folder paths that will hide progress bars (comma-separated). Example: "Daily Notes,Projects/Hidden"':
		'指定将隐藏进度条的文件夹路径（逗号分隔）。例如："Daily Notes,Projects/Hidden"',
	"Hide by metadata": "按元数据隐藏",
	'Specify frontmatter metadata that will hide progress bars. Example: "hide-progress-bar: true"':
		'指定将隐藏进度条的前置元数据。例如："hide-progress-bar: true"',
	"Task Status Switcher": "任务状态切换器",
	"Enable/disable the ability to cycle through task states by clicking.":
		"启用/禁用通过点击循环切换任务状态的功能。",
	"Enable custom task marks": "启用自定义任务标记",
	"Replace default checkboxes with styled text marks that follow your task status cycle when clicked.":
		"用样式化文本标记替换默认复选框，点击时遵循您的任务状态循环。",
	"Enable cycle complete status": "启用循环完成状态",
	"Enable/disable the ability to automatically cycle through task states when pressing a mark.":
		"启用/禁用按下标记时自动循环切换任务状态的功能。",
	"Always cycle new tasks": "始终循环新任务",
	"When enabled, newly inserted tasks will immediately cycle to the next status. When disabled, newly inserted tasks with valid marks will keep their original mark.":
		"启用后，新插入的任务将立即循环到下一个状态。禁用时，带有有效标记的新插入任务将保持其原始标记。",
	"Task Status Cycle and Marks": "任务状态循环和标记",
	"Define task states and their corresponding marks. The order from top to bottom defines the cycling sequence.":
		"定义任务状态及其对应的标记。从上到下的顺序定义了循环顺序。",
	"Completed Task Mover": "已完成任务移动功能",
	"Enable completed task mover": "启用已完成任务移动功能",
	"Toggle this to enable commands for moving completed tasks to another file.":
		"切换此选项以启用将已完成任务移动到另一个文件的命令。",
	"Task marker type": "任务标记类型",
	"Choose what type of marker to add to moved tasks":
		"选择要添加到已移动任务的标记类型",
	"Version marker text": "版本标记文本",
	"Text to append to tasks when moved (e.g., 'version 1.0')":
		"移动任务时附加的文本（例如，'version 1.0'）",
	"Date marker text": "日期标记文本",
	"Text to append to tasks when moved (e.g., 'archived on 2023-12-31')":
		"移动任务时附加的文本（例如，'archived on 2023-12-31'）",
	"Custom marker text": "自定义标记文本",
	"Use {{DATE:format}} for date formatting (e.g., {{DATE:YYYY-MM-DD}}":
		"使用 {{DATE:format}} 进行日期格式化（例如，{{DATE:YYYY-MM-DD}}",
	"Treat abandoned tasks as completed": "将已放弃任务视为已完成",
	"If enabled, abandoned tasks will be treated as completed.":
		"如果启用，已放弃的任务将被视为已完成。",
	"Complete all moved tasks": "完成所有已移动的任务",
	"If enabled, all moved tasks will be marked as completed.":
		"如果启用，所有已移动的任务将被标记为已完成。",
	"With current file link": "带当前文件链接",
	"A link to the current file will be added to the parent task of the moved tasks.":
		"当前文件的链接将添加到已移动任务的父任务中。",
	Donate: "捐赠",
	"If you like this plugin, consider donating to support continued development:":
		"如果您喜欢这个插件，请考虑捐赠以支持持续开发：",
	"Add number to the Progress Bar": "在进度条中添加数字",
	"Toggle this to allow this plugin to add tasks number to progress bar.":
		"切换此选项以允许插件在进度条中添加任务数量。",
	"Show percentage": "显示百分比",
	"Toggle this to allow this plugin to show percentage in the progress bar.":
		"切换此选项以允许插件在进度条中显示百分比。",
	"Customize progress text": "自定义进度文本",
	"Toggle this to customize text representation for different progress percentage ranges.":
		"切换此选项以自定义不同进度百分比范围的文本表示。",
	"Progress Ranges": "进度范围",
	"Define progress ranges and their corresponding text representations.":
		"定义进度范围及其对应的文本表示。",
	"Add new range": "添加新范围",
	"Add a new progress percentage range with custom text":
		"添加带有自定义文本的新进度百分比范围",
	"Min percentage (0-100)": "最小百分比 (0-100)",
	"Max percentage (0-100)": "最大百分比 (0-100)",
	"Text template (use {{PROGRESS}})": "文本模板（使用 {{PROGRESS}}）",
	"Reset to defaults": "重置为默认值",
	"Reset progress ranges to default values": "将进度范围重置为默认值",
	Reset: "重置",
	"Priority Picker Settings": "优先级选择器设置",
	"Toggle to enable priority picker dropdown for emoji and letter format priorities.":
		"切换以启用表情符号和字母格式优先级的优先级选择器下拉菜单。",
	"Enable priority picker": "启用优先级选择器",
	"Enable priority keyboard shortcuts": "启用优先级键盘快捷键",
	"Toggle to enable keyboard shortcuts for setting task priorities.":
		"切换以启用设置任务优先级的键盘快捷键。",
	"Date picker": "日期选择器",
	"Enable date picker": "启用日期选择器",
	"Toggle this to enable date picker for tasks. This will add a calendar icon near your tasks which you can click to select a date.":
		"切换此选项以启用任务的日期选择器。这将在您的任务旁边添加一个日历图标，您可以点击它来选择日期。",
	"Date mark": "日期标记",
	"Emoji mark to identify dates. You can use multiple emoji separated by commas.":
		"用于标识日期的表情符号。您可以使用逗号分隔的多个表情符号。",
	"Quick capture": "快速捕获",
	"Enable quick capture": "启用快速捕获",
	"Toggle this to enable Org-mode style quick capture panel. Press Alt+C to open the capture panel.":
		"切换此选项以启用 Org-mode 风格的快速捕获面板。按 Alt+C 打开捕获面板。",
	"Target file": "目标文件",
	"The file where captured text will be saved. You can include a path, e.g., 'folder/Quick Capture.md'":
		"捕获的文本将保存到的文件。您可以包含路径，例如，'folder/Quick Capture.md'",
	"Placeholder text": "占位文本",
	"Placeholder text to display in the capture panel":
		"在捕获面板中显示的占位文本",
	"Append to file": "附加到文件",
	"If enabled, captured text will be appended to the target file. If disabled, it will replace the file content.":
		"如果启用，捕获的文本将附加到目标文件。如果禁用，它将替换文件内容。",
	"Task Filter": "任务过滤器",
	"Enable Task Filter": "启用任务过滤器",
	"Toggle this to enable the task filter panel":
		"切换此选项以启用任务过滤器面板",
	"Preset Filters": "预设过滤器",
	"Create and manage preset filters for quick access to commonly used task filters.":
		"创建和管理预设过滤器，以快速访问常用的任务过滤器。",
	"Edit Filter: ": "编辑过滤器：",
	"Filter name": "过滤器名称",
	"Task Status": "任务状态",
	"Include or exclude tasks based on their status":
		"根据任务状态包含或排除任务",
	"Include Completed Tasks": "包含已完成任务",
	"Include In Progress Tasks": "包含进行中任务",
	"Include Abandoned Tasks": "包含已放弃任务",
	"Include Not Started Tasks": "包含未开始任务",
	"Include Planned Tasks": "包含计划任务",
	"Related Tasks": "相关任务",
	"Include parent, child, and sibling tasks in the filter":
		"在过滤器中包含父任务、子任务和同级任务",
	"Include Parent Tasks": "包含父任务",
	"Include Child Tasks": "包含子任务",
	"Include Sibling Tasks": "包含同级任务",
	"Advanced Filter": "高级过滤器",
	"Use boolean operations: AND, OR, NOT. Example: 'text content AND #tag1'":
		"使用布尔运算：AND, OR, NOT。例如：'text content AND #tag1'",
	"Filter query": "过滤查询",
	"Filter out tasks": "过滤掉任务",
	"If enabled, tasks that match the query will be hidden, otherwise they will be shown":
		"如果启用，匹配查询的任务将被隐藏，否则将显示",
	Save: "保存",
	Cancel: "取消",
	"Enable task status switcher": "启用任务状态切换器",
	"Add Status": "添加状态",
	"Say Thank You": "谢谢",
	"Hide filter panel": "隐藏过滤器面板",
	"Show filter panel": "显示过滤器面板",
	"Filter Tasks": "过滤任务",
	"Preset filters": "预设过滤器",
	"Select a saved filter preset to apply": "选择一个保存的过滤器预设以应用",
	"Select a preset...": "选择一个预设...",
	Query: "查询",
	"Use boolean operations: AND, OR, NOT. Example: 'text content AND #tag1 AND DATE:<2022-01-02 NOT PRIORITY:>=#B' - Supports >, <, =, >=, <=, != for PRIORITY and DATE.":
		"使用布尔运算：AND, OR, NOT。例如：'text content AND #tag1 AND DATE:<2022-01-02 NOT PRIORITY:>=#B' - 支持 >, <, =, >=, <=, != 用于 PRIORITY 和 DATE。",
	"If true, tasks that match the query will be hidden, otherwise they will be shown":
		"如果启用，匹配查询的任务将被隐藏，否则将显示",
	Completed: "已完成",
	"In Progress": "进行中",
	Abandoned: "已放弃",
	"Not Started": "未开始",
	Planned: "计划",
	"Include Related Tasks": "包含相关任务",
	"Parent Tasks": "父任务",
	"Child Tasks": "子任务",
	"Sibling Tasks": "同级任务",
	Apply: "应用",
	"New Preset": "新预设",
	"Preset saved": "预设已保存",
	"No changes to save": "没有更改要保存",
	Close: "关闭",
	"Capture to": "捕获到",
	Capture: "捕获",
	"Capture thoughts, tasks, or ideas...": "捕获想法、任务或想法...",
	Tomorrow: "明天",
	"In 2 days": "2天后",
	"In 3 days": "3天后",
	"In 5 days": "5天后",
	"In 1 week": "1周后",
	"In 10 days": "10天后",
	"In 2 weeks": "2周后",
	"In 1 month": "1个月后",
	"In 2 months": "2个月后",
	"In 3 months": "3个月后",
	"In 6 months": "6个月后",
	"In 1 year": "1年后",
	"In 5 years": "5年后",
	"In 10 years": "10年后",
	"Highest priority": "最高优先级",
	"High priority": "高优先级",
	"Medium priority": "中等优先级",
	"No priority": "无优先级",
	"Low priority": "低优先级",
	"Lowest priority": "最低优先级",
	"Priority A": "优先级A",
	"Priority B": "优先级B",
	"Priority C": "优先级C",
	"Task Priority": "任务优先级",
	"Remove Priority": "移除优先级",
	"Cycle task status forward": "向前循环任务状态",
	"Cycle task status backward": "向后循环任务状态",
	"Remove priority": "移除优先级",
	"Move task to another file": "将任务移动到另一个文件",
	"Move all completed subtasks to another file":
		"将所有已完成的子任务移动到另一个文件",
	"Move direct completed subtasks to another file":
		"将直接已完成的子任务移动到另一个文件",
	"Move all subtasks to another file": "将所有子任务移动到另一个文件",
	"Set priority": "设置优先级",
	"Toggle quick capture panel": "切换快速捕获面板",
	"Quick capture (Global)": "快速捕获（全局）",
	"Toggle task filter panel": "切换任务过滤器面板",
	"Filter Mode": "过滤模式",
	"Choose whether to include or exclude tasks that match the filters":
		"选择是包含还是排除符合过滤条件的任务",
	"Show matching tasks": "显示匹配的任务",
	"Hide matching tasks": "隐藏匹配的任务",
	"Choose whether to show or hide tasks that match the filters":
		"选择是显示还是隐藏符合过滤条件的任务",
	"Create new file:": "创建新文件：",
	"Completed tasks moved to": "已完成任务已移动到",
	"Failed to create file:": "创建文件失败：",
	"Beginning of file": "文件开头",
	"Failed to move tasks:": "移动任务失败：",
	"No active file found": "未找到活动文件",
	"Task moved to": "任务已移动到",
	"Failed to move task:": "移动任务失败：",
	"Nothing to capture": "没有内容可捕获",
	"Captured successfully": "捕获成功",
	"Failed to save:": "保存失败：",
	"Captured successfully to": "成功捕获到",
	Total: "总计",
	Workflow: "工作流",
	"Add as workflow root": "添加为工作流根节点",
	"Move to stage": "移动到阶段",
	"Complete stage": "完成阶段",
	"Add child task with same stage": "添加相同阶段的子任务",
	"Could not open quick capture panel in the current editor":
		"无法在当前编辑器中打开快速捕获面板",
	"Just started {{PROGRESS}}%": "刚刚开始 {{PROGRESS}}%",
	"Making progress {{PROGRESS}}%": "正在进行 {{PROGRESS}}%",
	"Half way {{PROGRESS}}%": "已完成一半 {{PROGRESS}}%",
	"Good progress {{PROGRESS}}%": "进展良好 {{PROGRESS}}%",
	"Almost there {{PROGRESS}}%": "即将完成 {{PROGRESS}}%",
	"Progress bar": "进度条",
	"You can customize the progress bar behind the parent task(usually at the end of the task). You can also customize the progress bar for the task below the heading.":
		"您可以自定义父任务后面的进度条（通常在任务末尾）。您还可以自定义标题下方任务的进度条。",
	"Hide progress bars": "隐藏进度条",
	"Parent task changer": "父任务更改器",
	"Change the parent task of the current task.": "更改当前任务的父任务。",
	"No preset filters created yet. Click 'Add New Preset' to create one.":
		"尚未创建预设过滤器。点击'添加新预设'创建一个。",
	"Configure task workflows for project and process management":
		"配置项目和流程管理的任务工作流",
	"Enable workflow": "启用工作流",
	"Toggle to enable the workflow system for tasks":
		"切换以启用任务的工作流系统",
	"Auto-add timestamp": "自动添加时间戳",
	"Automatically add a timestamp to the task when it is created":
		"创建任务时自动添加时间戳",
	"Timestamp format:": "时间戳格式：",
	"Timestamp format": "时间戳格式",
	"Remove timestamp when moving to next stage": "移动到下一阶段时移除时间戳",
	"Remove the timestamp from the current task when moving to the next stage":
		"移动到下一阶段时从当前任务中移除时间戳",
	"Calculate spent time": "计算花费时间",
	"Calculate and display the time spent on the task when moving to the next stage":
		"移动到下一阶段时计算并显示在任务上花费的时间",
	"Format for spent time:": "花费时间格式：",
	"Calculate spent time when move to next stage.":
		"移动到下一阶段时计算花费时间。",
	"Spent time format": "花费时间格式",
	"Calculate full spent time": "计算总花费时间",
	"Calculate the full spent time from the start of the task to the last stage":
		"计算从任务开始到最后阶段的总花费时间",
	"Auto remove last stage marker": "自动移除最后阶段标记",
	"Automatically remove the last stage marker when a task is completed":
		"任务完成时自动移除最后阶段标记",
	"Auto-add next task": "自动添加下一任务",
	"Automatically create a new task with the next stage when completing a task":
		"完成任务时自动创建具有下一阶段的新任务",
	"Workflow definitions": "工作流定义",
	"Configure workflow templates for different types of processes":
		"为不同类型的流程配置工作流模板",
	"No workflow definitions created yet. Click 'Add New Workflow' to create one.":
		"尚未创建工作流定义。点击'添加新工作流'创建一个。",
	"Edit workflow": "编辑工作流",
	"Remove workflow": "移除工作流",
	"Delete workflow": "删除工作流",
	Delete: "删除",
	"Add New Workflow": "添加新工作流",
	"New Workflow": "新工作流",
	"Create New Workflow": "创建新工作流",
	"Workflow name": "工作流名称",
	"A descriptive name for the workflow": "工作流的描述性名称",
	"Workflow ID": "工作流ID",
	"A unique identifier for the workflow (used in tags)":
		"工作流的唯一标识符（用于标签）",
	Description: "描述",
	"Optional description for the workflow": "工作流的可选描述",
	"Describe the purpose and use of this workflow...":
		"描述此工作流的目的和用途...",
	"Workflow Stages": "工作流阶段",
	"No stages defined yet. Add a stage to get started.":
		"尚未定义阶段。添加一个阶段开始。",
	Edit: "编辑",
	"Move up": "上移",
	"Move down": "下移",
	"Sub-stage": "子阶段",
	"Sub-stage name": "子阶段名称",
	"Sub-stage ID": "子阶段ID",
	"Next: ": "下一个：",
	"Add Sub-stage": "添加子阶段",
	"New Sub-stage": "新子阶段",
	"Edit Stage": "编辑阶段",
	"Stage name": "阶段名称",
	"A descriptive name for this workflow stage": "此工作流阶段的描述性名称",
	"Stage ID": "阶段ID",
	"A unique identifier for the stage (used in tags)":
		"阶段的唯一标识符（用于标签）",
	"Stage type": "阶段类型",
	"The type of this workflow stage": "此工作流阶段的类型",
	"Linear (sequential)": "线性（顺序）",
	"Cycle (repeatable)": "循环（可重复）",
	"Terminal (end stage)": "终端（结束阶段）",
	"Next stage": "下一阶段",
	"The stage to proceed to after this one": "此阶段之后要进行的阶段",
	"Sub-stages": "子阶段",
	"Define cycle sub-stages (optional)": "定义循环子阶段（可选）",
	"No sub-stages defined yet.": "尚未定义子阶段。",
	"Can proceed to": "可以进行到",
	"Additional stages that can follow this one (for right-click menu)":
		"可以跟随此阶段的其他阶段（用于右键菜单）",
	"No additional destination stages defined.": "未定义其他目标阶段。",
	Remove: "移除",
	Add: "添加",
	"Name and ID are required.": "名称和ID是必需的。",
	"End of file": "文件结尾",
	"Include in cycle": "包含在循环中",
	Preset: "预设",
	"Preset name": "预设名称",
	"Edit Filter": "编辑过滤器",
	"Add New Preset": "添加新预设",
	"New Filter": "新过滤器",
	"Reset to Default Presets": "重置为默认预设",
	"This will replace all your current presets with the default set. Are you sure?":
		"这将替换您当前的所有预设，并使用默认设置。您确定吗？",
	"Edit Workflow": "编辑工作流",
	General: "常规",
	"Progress Bar": "进度条",
	"Task Mover": "任务移动器",
	"Quick Capture": "快速捕获",
	"Date & Priority": "日期和优先级",
	About: "关于",
	"Count sub children of current Task": "计算当前任务的子任务",
	"Toggle this to allow this plugin to count sub tasks when generating progress bar\t.":
		"切换此选项以允许此插件在生成进度条时计算子任务。",
	"Configure task status settings": "配置任务状态设置",
	"Configure which task markers to count or exclude":
		"配置要计算或排除的任务标记",
	"Task status cycle and marks": "任务状态循环和标记",
	Version: "版本",
	Documentation: "文档",
	"View the documentation for this plugin": "查看此插件的文档",
	"Open Documentation": "打开文档",
	"Incomplete tasks": "未完成的任务",
	"In progress tasks": "进行中的任务",
	"Completed tasks": "已完成的任务",
	"All tasks": "所有任务",
	"After heading": "标题之后",
	"End of section": "章节结尾",
	"Enable text mark in source mode": "在源码模式中启用文本标记",
	"Make the text mark in source mode follow the task status cycle when clicked.":
		"点击时使源码模式中的文本标记跟随任务状态循环。",
	"Status name": "状态名称",
	"Progress display mode": "进度显示模式",
	"Choose how to display task progress": "选择如何显示任务进度",
	"No progress indicators": "无进度指示器",
	"Graphical progress bar": "图形进度条",
	"Text progress indicator": "文本进度指示器",
	"Both graphical and text": "图形和文本都显示",
	"Toggle this to allow this plugin to count sub tasks when generating progress bar.":
		"切换此选项以允许此插件在生成进度条时计算子任务。",
	"Progress format": "进度格式",
	"Choose how to display the task progress": "选择如何显示任务进度",
	"Percentage (75%)": "百分比 (75%)",
	"Bracketed percentage ([75%])": "带括号的百分比 ([75%])",
	"Fraction (3/4)": "分数 (3/4)",
	"Bracketed fraction ([3/4])": "带括号的分数 ([3/4])",
	"Detailed ([3✓ 1⟳ 0✗ 1? / 5])": "详细 ([3✓ 1⟳ 0✗ 1? / 5])",
	"Custom format": "自定义格式",
	"Range-based text": "基于范围的文本",
	"Use placeholders like {{COMPLETED}}, {{TOTAL}}, {{PERCENT}}, etc.":
		"使用占位符如 {{COMPLETED}}、{{TOTAL}}、{{PERCENT}} 等。",
	"Preview:": "预览：",
	"Available placeholders": "可用占位符",
	"Available placeholders: {{COMPLETED}}, {{TOTAL}}, {{IN_PROGRESS}}, {{ABANDONED}}, {{PLANNED}}, {{NOT_STARTED}}, {{PERCENT}}, {{COMPLETED_SYMBOL}}, {{IN_PROGRESS_SYMBOL}}, {{ABANDONED_SYMBOL}}, {{PLANNED_SYMBOL}}":
		"可用占位符：{{COMPLETED}}、{{TOTAL}}、{{IN_PROGRESS}}、{{ABANDONED}}、{{PLANNED}}、{{NOT_STARTED}}、{{PERCENT}}、{{COMPLETED_SYMBOL}}、{{IN_PROGRESS_SYMBOL}}、{{ABANDONED_SYMBOL}}、{{PLANNED_SYMBOL}}",
	"Expression examples": "表达式示例",
	"Examples of advanced formats using expressions":
		"使用表达式的高级格式示例",
	"Text Progress Bar": "文本进度条",
	"Emoji Progress Bar": "表情符号进度条",
	"Color-coded Status": "颜色编码状态",
	"Status with Icons": "带图标的状态",
	Preview: "预览",
	Use: "使用",
	"Toggle this to show percentage instead of completed/total count.":
		"切换此选项以显示百分比而不是已完成/总计数。",
	"Customize progress ranges": "自定义进度范围",
	"Toggle this to customize the text for different progress ranges.":
		"切换此选项以自定义不同进度范围的文本。",
	"Apply Theme": "应用主题",
};

export default translations;
