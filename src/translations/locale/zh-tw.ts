// Traditional Chinese translations
const translations = {
	"Comprehensive task management plugin for Obsidian with progress bars, task status cycling, and advanced task tracking features.":
		"全面的 Obsidian 任務管理插件，具有進度條、任務狀態循環和進階任務追蹤功能。",
	"Show progress bar": "顯示進度條",
	"Toggle this to show the progress bar.": "切換此選項以顯示進度條。",
	"Support hover to show progress info": "支援懸停顯示進度資訊",
	"Toggle this to allow this plugin to show progress info when hovering over the progress bar.":
		"切換此選項以允許此插件在懸停於進度條上時顯示進度資訊。",
	"Add progress bar to non-task bullet": "為非任務項目添加進度條",
	"Toggle this to allow adding progress bars to regular list items (non-task bullets).":
		"切換此選項以允許為普通列表項目（非任務項目）添加進度條。",
	"Add progress bar to Heading": "為標題添加進度條",
	"Toggle this to allow this plugin to add progress bar for Task below the headings.":
		"切換此選項以允許此插件為標題下的任務添加進度條。",
	"Enable heading progress bars": "啟用標題進度條",
	"Add progress bars to headings to show progress of all tasks under that heading.":
		"為標題添加進度條以顯示該標題下所有任務的進度。",
	"Auto complete parent task": "自動完成父任務",
	"Toggle this to allow this plugin to auto complete parent task when all child tasks are completed.":
		"切換此選項以允許此插件在所有子任務完成時自動完成父任務。",
	"Mark parent as 'In Progress' when partially complete":
		"當部分完成時將父任務標記為「進行中」",
	"When some but not all child tasks are completed, mark the parent task as 'In Progress'. Only works when 'Auto complete parent' is enabled.":
		"當部分但非全部子任務完成時，將父任務標記為「進行中」。僅在啟用「自動完成父任務」時有效。",
	"Count sub children level of current Task": "計算當前任務的子任務層級",
	"Toggle this to allow this plugin to count sub tasks.":
		"切換此選項以允許此插件計算子任務。",
	"Task Status Settings": "任務狀態設定",
	"Select a predefined task status collection or customize your own":
		"選擇預定義的任務狀態集合或自定義您自己的",
	"Completed task markers": "已完成任務標記",
	'Characters in square brackets that represent completed tasks. Example: "x|X"':
		'方括號中表示已完成任務的字符。例如："x|X"',
	"Planned task markers": "計劃任務標記",
	'Characters in square brackets that represent planned tasks. Example: "?"':
		'方括號中表示計劃任務的字符。例如："?"',
	"In progress task markers": "進行中任務標記",
	'Characters in square brackets that represent tasks in progress. Example: ">|/"':
		'方括號中表示進行中任務的字符。例如：">|/"',
	"Abandoned task markers": "已放棄任務標記",
	'Characters in square brackets that represent abandoned tasks. Example: "-"':
		'方括號中表示已放棄任務的字符。例如："-"',
	'Characters in square brackets that represent not started tasks. Default is space " "':
		'方括號中表示未開始任務的字符。預設為空格 " "',
	"Count other statuses as": "將其他狀態計為",
	'Select the status to count other statuses as. Default is "Not Started".':
		"選擇將其他狀態計為哪種狀態。預設為「未開始」。",
	"Task Counting Settings": "任務計數設定",
	"Exclude specific task markers": "排除特定任務標記",
	'Specify task markers to exclude from counting. Example: "?|/"':
		'指定要從計數中排除的任務標記。例如："?|/"',
	"Only count specific task markers": "僅計數特定任務標記",
	"Toggle this to only count specific task markers":
		"切換此選項以僅計數特定任務標記",
	"Specific task markers to count": "要計數的特定任務標記",
	'Specify which task markers to count. Example: "x|X|>|/"':
		'指定要計數的任務標記。例如："x|X|>|/"',
	"Conditional Progress Bar Display": "條件性進度條顯示",
	"Hide progress bars based on conditions": "根據條件隱藏進度條",
	"Toggle this to enable hiding progress bars based on tags, folders, or metadata.":
		"切換此選項以啟用根據標籤、資料夾或元數據隱藏進度條。",
	"Hide by tags": "按標籤隱藏",
	'Specify tags that will hide progress bars (comma-separated, without #). Example: "no-progress-bar,hide-progress"':
		'指定將隱藏進度條的標籤（逗號分隔，不帶 #）。例如："no-progress-bar,hide-progress"',
	"Hide by folders": "按資料夾隱藏",
	'Specify folder paths that will hide progress bars (comma-separated). Example: "Daily Notes,Projects/Hidden"':
		'指定將隱藏進度條的資料夾路徑（逗號分隔）。例如："Daily Notes,Projects/Hidden"',
	"Hide by metadata": "按元數據隱藏",
	'Specify frontmatter metadata that will hide progress bars. Example: "hide-progress-bar: true"':
		'指定將隱藏進度條的前置元數據。例如："hide-progress-bar: true"',
	"Task Status Switcher": "任務狀態切換器",
	"Enable task status switcher": "啟用任務狀態切換器",
	"Enable/disable the ability to cycle through task states by clicking.":
		"啟用/禁用通過點擊循環切換任務狀態的功能。",
	"Enable custom task marks": "啟用自定義任務標記",
	"Replace default checkboxes with styled text marks that follow your task status cycle when clicked.":
		"用樣式化文本標記替換預設複選框，點擊時遵循您的任務狀態循環。",
	"Enable cycle complete status": "啟用循環完成狀態",
	"Enable/disable the ability to automatically cycle through task states when pressing a mark.":
		"啟用/禁用按下標記時自動循環切換任務狀態的功能。",
	"Always cycle new tasks": "始終循環新任務",
	"When enabled, newly inserted tasks will immediately cycle to the next status. When disabled, newly inserted tasks with valid marks will keep their original mark.":
		"啟用時，新插入的任務將立即循環到下一個狀態。禁用時，帶有有效標記的新插入任務將保持其原始標記。",
	"Task Status Cycle and Marks": "任務狀態循環和標記",
	"Define task states and their corresponding marks. The order from top to bottom defines the cycling sequence.":
		"定義任務狀態及其對應的標記。從上到下的順序定義了循環順序。",
	"Completed Task Mover": "已完成任務移動器",
	"Enable completed task mover": "啟用已完成任務移動器",
	"Toggle this to enable commands for moving completed tasks to another file.":
		"切換此選項以啟用將已完成任務移動到另一個文件的命令。",
	"Task marker type": "任務標記類型",
	"Choose what type of marker to add to moved tasks":
		"選擇要添加到已移動任務的標記類型",
	"Version marker text": "版本標記文本",
	"Text to append to tasks when moved (e.g., 'version 1.0')":
		"移動任務時附加的文本（例如，'version 1.0'）",
	"Date marker text": "日期標記文本",
	"Text to append to tasks when moved (e.g., 'archived on 2023-12-31')":
		"移動任務時附加的文本（例如，'archived on 2023-12-31'）",
	"Custom marker text": "自定義標記文本",
	"Use {{DATE:format}} for date formatting (e.g., {{DATE:YYYY-MM-DD}}":
		"使用 {{DATE:format}} 進行日期格式化（例如，{{DATE:YYYY-MM-DD}}",
	"Treat abandoned tasks as completed": "將已放棄任務視為已完成",
	"If enabled, abandoned tasks will be treated as completed.":
		"如果啟用，已放棄的任務將被視為已完成。",
	"Complete all moved tasks": "完成所有已移動的任務",
	"If enabled, all moved tasks will be marked as completed.":
		"如果啟用，所有已移動的任務將被標記為已完成。",
	"With current file link": "帶有當前文件連結",
	"A link to the current file will be added to the parent task of the moved tasks.":
		"當前文件的連結將添加到已移動任務的父任務。",
	Donate: "捐贈",
	"If you like this plugin, consider donating to support continued development:":
		"如果您喜歡這個插件，請考慮捐贈以支持持續開發：",
	"Add number to the Progress Bar": "在進度條中添加數字",
	"Toggle this to allow this plugin to add tasks number to progress bar.":
		"切換此選項以允許此插件在進度條中添加任務數量。",
	"Show percentage": "顯示百分比",
	"Toggle this to allow this plugin to show percentage in the progress bar.":
		"切換此選項以允許此插件在進度條中顯示百分比。",
	"Customize progress text": "自定義進度文本",
	"Toggle this to customize text representation for different progress percentage ranges.":
		"切換此選項以自定義不同進度百分比範圍的文本表示。",
	"Progress Ranges": "進度範圍",
	"Define progress ranges and their corresponding text representations.":
		"定義進度範圍及其對應的文本表示。",
	"Add new range": "添加新範圍",
	"Add a new progress percentage range with custom text":
		"添加帶有自定義文本的新進度百分比範圍",
	"Min percentage (0-100)": "最小百分比 (0-100)",
	"Max percentage (0-100)": "最大百分比 (0-100)",
	"Text template (use {{PROGRESS}})": "文本模板（使用 {{PROGRESS}}）",
	"Reset to defaults": "重置為預設值",
	"Reset progress ranges to default values": "將進度範圍重置為預設值",
	Reset: "重置",
	"Priority Picker Settings": "優先級選擇器設定",
	"Toggle to enable priority picker dropdown for emoji and letter format priorities.":
		"切換以啟用表情符號和字母格式優先級的優先級選擇器下拉菜單。",
	"Enable priority picker": "啟用優先級選擇器",
	"Enable priority keyboard shortcuts": "啟用優先級鍵盤快捷鍵",
	"Toggle to enable keyboard shortcuts for setting task priorities.":
		"切換以啟用設置任務優先級的鍵盤快捷鍵。",
	"Date picker": "日期選擇器",
	"Enable date picker": "啟用日期選擇器",
	"Toggle this to enable date picker for tasks. This will add a calendar icon near your tasks which you can click to select a date.":
		"切換此選項以啟用任務的日期選擇器。這將在您的任務旁添加一個日曆圖標，您可以點擊它來選擇日期。",
	"Date mark": "日期標記",
	"Emoji mark to identify dates. You can use multiple emoji separated by commas.":
		"用於識別日期的表情符號標記。您可以使用逗號分隔的多個表情符號。",
	"Quick capture": "快速捕獲",
	"Enable quick capture": "啟用快速捕獲",
	"Toggle this to enable Org-mode style quick capture panel. Press Alt+C to open the capture panel.":
		"切換此選項以啟用 Org-mode 風格的快速捕獲面板。按 Alt+C 打開捕獲面板。",
	"Target file": "目標文件",
	"The file where captured text will be saved. You can include a path, e.g., 'folder/Quick Capture.md'":
		"捕獲的文本將保存的文件。您可以包含路徑，例如，'folder/Quick Capture.md'",
	"Placeholder text": "佔位符文本",
	"Placeholder text to display in the capture panel":
		"在捕獲面板中顯示的佔位符文本",
	"Append to file": "附加到文件",
	"If enabled, captured text will be appended to the target file. If disabled, it will replace the file content.":
		"如果啟用，捕獲的文本將附加到目標文件。如果禁用，它將替換文件內容。",
	"Task Filter": "任務過濾器",
	"Enable Task Filter": "啟用任務過濾器",
	"Toggle this to enable the task filter panel":
		"切換此選項以啟用任務過濾器面板",
	"Preset Filters": "預設過濾器",
	"Create and manage preset filters for quick access to commonly used task filters.":
		"創建和管理預設過濾器，以快速訪問常用的任務過濾器。",
	"Edit Filter: ": "編輯過濾器：",
	"Filter name": "過濾器名稱",
	"Task Status": "任務狀態",
	"Include or exclude tasks based on their status":
		"根據任務狀態包含或排除任務",
	"Include Completed Tasks": "包含已完成任務",
	"Include In Progress Tasks": "包含進行中任務",
	"Include Abandoned Tasks": "包含已放棄任務",
	"Include Not Started Tasks": "包含未開始任務",
	"Include Planned Tasks": "包含計劃任務",
	"Related Tasks": "相關任務",
	"Include parent, child, and sibling tasks in the filter":
		"在過濾器中包含父任務、子任務和同級任務",
	"Include Parent Tasks": "包含父任務",
	"Include Child Tasks": "包含子任務",
	"Include Sibling Tasks": "包含同級任務",
	"Advanced Filter": "進階過濾器",
	"Use boolean operations: AND, OR, NOT. Example: 'text content AND #tag1'":
		"使用布爾運算：AND, OR, NOT。例如：'text content AND #tag1'",
	"Filter query": "過濾查詢",
	"Filter out tasks": "過濾掉任務",
	"If enabled, tasks that match the query will be hidden, otherwise they will be shown":
		"如果啟用，符合查詢的任務將被隱藏，否則將被顯示",
	Save: "保存",
	Cancel: "取消",
	"Add Status": "添加狀態",
	"Say Thank You": "謝謝",
	"Hide filter panel": "隱藏過濾器面板",
	"Show filter panel": "顯示過濾器面板",
	"Filter Tasks": "過濾任務",
	"Preset filters": "預設過濾器",
	"Select a saved filter preset to apply": "選擇一個保存的過濾器預設以應用",
	"Select a preset...": "選擇一個預設...",
	Query: "查詢",
	"Use boolean operations: AND, OR, NOT. Example: 'text content AND #tag1 AND DATE:<2022-01-02 NOT PRIORITY:>=#B' - Supports >, <, =, >=, <=, != for PRIORITY and DATE.":
		"使用布爾運算：AND, OR, NOT。例如：'text content AND #tag1 AND DATE:<2022-01-02 NOT PRIORITY:>=#B' - 支持 >, <, =, >=, <=, != 用於 PRIORITY 和 DATE。",
	"If true, tasks that match the query will be hidden, otherwise they will be shown":
		"如果啟用，匹配查詢的任務將被隱藏，否則將顯示",
	Completed: "已完成",
	"In Progress": "進行中",
	Abandoned: "已放棄",
	"Not Started": "未開始",
	Planned: "計劃",
	"Include Related Tasks": "包含相關任務",
	"Parent Tasks": "父任務",
	"Child Tasks": "子任務",
	"Sibling Tasks": "同級任務",
	Apply: "應用",
	"New Preset": "新預設",
	"Preset saved": "預設已保存",
	"No changes to save": "沒有更改要保存",
	Close: "關閉",
	"Capture to": "捕獲到",
	Capture: "捕獲",
	"Capture thoughts, tasks, or ideas...": "捕獲想法、任務或想法...",
	Tomorrow: "明天",
	"In 2 days": "2天後",
	"In 3 days": "3天後",
	"In 5 days": "5天後",
	"In 1 week": "1週後",
	"In 10 days": "10天後",
	"In 2 weeks": "2週後",
	"In 1 month": "1個月後",
	"In 2 months": "2個月後",
	"In 3 months": "3個月後",
	"In 6 months": "6個月後",
	"In 1 year": "1年後",
	"In 5 years": "5年後",
	"In 10 years": "10年後",
	"Highest priority": "最高優先級",
	"High priority": "高優先級",
	"Medium priority": "中優先級",
	"No priority": "無優先級",
	"Low priority": "低優先級",
	"Lowest priority": "最低優先級",
	"Priority A": "優先級A",
	"Priority B": "優先級B",
	"Priority C": "優先級C",
	"Task Priority": "任務優先級",
	"Remove Priority": "移除優先級",
	"Cycle task status forward": "循環任務狀態向前",
	"Cycle task status backward": "循環任務狀態向後",
	"Remove priority": "移除優先級",
	"Move task to another file": "移動任務到另一個文件",
	"Move all completed subtasks to another file":
		"移動所有已完成子任務到另一個文件",
	"Move direct completed subtasks to another file":
		"移動直接已完成子任務到另一個文件",
	"Move all subtasks to another file": "移動所有子任務到另一個文件",
	"Set priority": "設置優先級",
	"Toggle quick capture panel": "切換快速捕獲面板",
	"Quick capture (Global)": "快速捕獲（全局）",
	"Toggle task filter panel": "切換任務過濾器面板",
	"Filter Mode": "過濾模式",
	"Choose whether to include or exclude tasks that match the filters":
		"選擇是包含還是排除符合過濾條件的任務",
	"Show matching tasks": "顯示匹配的任務",
	"Hide matching tasks": "隱藏匹配的任務",
	"Choose whether to show or hide tasks that match the filters":
		"選擇是顯示還是隱藏符合過濾條件的任務",
};

export default translations;
