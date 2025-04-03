// English translations
const translations = {
  "Comprehensive task management plugin for Obsidian with progress bars, task status cycling, and advanced task tracking features.": "Comprehensive task management plugin for Obsidian with progress bars, task status cycling, and advanced task tracking features.",
  "Show progress bar": "Show progress bar",
  "Toggle this to show the progress bar.": "Toggle this to show the progress bar.",
  "Support hover to show progress info": "Support hover to show progress info",
  "Toggle this to allow this plugin to show progress info when hovering over the progress bar.": "Toggle this to allow this plugin to show progress info when hovering over the progress bar.",
  "Add progress bar to non-task bullet": "Add progress bar to non-task bullet",
  "Toggle this to allow adding progress bars to regular list items (non-task bullets).": "Toggle this to allow adding progress bars to regular list items (non-task bullets).",
  "Add progress bar to Heading": "Add progress bar to Heading",
  "Toggle this to allow this plugin to add progress bar for Task below the headings.": "Toggle this to allow this plugin to add progress bar for Task below the headings.",
  "Enable heading progress bars": "Enable heading progress bars",
  "Add progress bars to headings to show progress of all tasks under that heading.": "Add progress bars to headings to show progress of all tasks under that heading.",
  "Auto complete parent task": "Auto complete parent task",
  "Toggle this to allow this plugin to auto complete parent task when all child tasks are completed.": "Toggle this to allow this plugin to auto complete parent task when all child tasks are completed.",
  "Mark parent as 'In Progress' when partially complete": "Mark parent as 'In Progress' when partially complete",
  "When some but not all child tasks are completed, mark the parent task as 'In Progress'. Only works when 'Auto complete parent' is enabled.": "When some but not all child tasks are completed, mark the parent task as 'In Progress'. Only works when 'Auto complete parent' is enabled.",
  "Count sub children level of current Task": "Count sub children level of current Task",
  "Toggle this to allow this plugin to count sub tasks.": "Toggle this to allow this plugin to count sub tasks.",
  "Task Status Settings": "Task Status Settings",
  "Select a predefined task status collection or customize your own": "Select a predefined task status collection or customize your own",
  "Completed task markers": "Completed task markers",
  "Characters in square brackets that represent completed tasks. Example: \"x|X\"": "Characters in square brackets that represent completed tasks. Example: \"x|X\"",
  "Planned task markers": "Planned task markers",
  "Characters in square brackets that represent planned tasks. Example: \"?\"": "Characters in square brackets that represent planned tasks. Example: \"?\"",
  "In progress task markers": "In progress task markers",
  "Characters in square brackets that represent tasks in progress. Example: \">|/\"": "Characters in square brackets that represent tasks in progress. Example: \">|/\"",
  "Abandoned task markers": "Abandoned task markers",
  "Characters in square brackets that represent abandoned tasks. Example: \"-\"": "Characters in square brackets that represent abandoned tasks. Example: \"-\"",
  "Characters in square brackets that represent not started tasks. Default is space \" \"": "Characters in square brackets that represent not started tasks. Default is space \" \"",
  "Count other statuses as": "Count other statuses as",
  "Select the status to count other statuses as. Default is \"Not Started\".": "Select the status to count other statuses as. Default is \"Not Started\".",
  "Task Counting Settings": "Task Counting Settings",
  "Exclude specific task markers": "Exclude specific task markers",
  "Specify task markers to exclude from counting. Example: \"?|/\"": "Specify task markers to exclude from counting. Example: \"?|/\"",
  "Only count specific task markers": "Only count specific task markers",
  "Toggle this to only count specific task markers": "Toggle this to only count specific task markers",
  "Specific task markers to count": "Specific task markers to count",
  "Specify which task markers to count. Example: \"x|X|>|/\"": "Specify which task markers to count. Example: \"x|X|>|/\"",
  "Conditional Progress Bar Display": "Conditional Progress Bar Display",
  "Hide progress bars based on conditions": "Hide progress bars based on conditions",
  "Toggle this to enable hiding progress bars based on tags, folders, or metadata.": "Toggle this to enable hiding progress bars based on tags, folders, or metadata.",
  "Hide by tags": "Hide by tags",
  "Specify tags that will hide progress bars (comma-separated, without #). Example: \"no-progress-bar,hide-progress\"": "Specify tags that will hide progress bars (comma-separated, without #). Example: \"no-progress-bar,hide-progress\"",
  "Hide by folders": "Hide by folders",
  "Specify folder paths that will hide progress bars (comma-separated). Example: \"Daily Notes,Projects/Hidden\"": "Specify folder paths that will hide progress bars (comma-separated). Example: \"Daily Notes,Projects/Hidden\"",
  "Hide by metadata": "Hide by metadata",
  "Specify frontmatter metadata that will hide progress bars. Example: \"hide-progress-bar: true\"": "Specify frontmatter metadata that will hide progress bars. Example: \"hide-progress-bar: true\"",
  "Task Status Switcher": "Task Status Switcher",
  "Enable task status switcher": "Enable task status switcher",
  "Enable/disable the ability to cycle through task states by clicking.": "Enable/disable the ability to cycle through task states by clicking.",
  "Enable custom task marks": "Enable custom task marks",
  "Replace default checkboxes with styled text marks that follow your task status cycle when clicked.": "Replace default checkboxes with styled text marks that follow your task status cycle when clicked.",
  "Enable cycle complete status": "Enable cycle complete status",
  "Enable/disable the ability to automatically cycle through task states when pressing a mark.": "Enable/disable the ability to automatically cycle through task states when pressing a mark.",
  "Always cycle new tasks": "Always cycle new tasks",
  "When enabled, newly inserted tasks will immediately cycle to the next status. When disabled, newly inserted tasks with valid marks will keep their original mark.": "When enabled, newly inserted tasks will immediately cycle to the next status. When disabled, newly inserted tasks with valid marks will keep their original mark.",
  "Task Status Cycle and Marks": "Task Status Cycle and Marks",
  "Define task states and their corresponding marks. The order from top to bottom defines the cycling sequence.": "Define task states and their corresponding marks. The order from top to bottom defines the cycling sequence.",
  "Add Status": "Add Status",
  "Completed Task Mover": "Completed Task Mover",
  "Enable completed task mover": "Enable completed task mover",
  "Toggle this to enable commands for moving completed tasks to another file.": "Toggle this to enable commands for moving completed tasks to another file.",
  "Task marker type": "Task marker type",
  "Choose what type of marker to add to moved tasks": "Choose what type of marker to add to moved tasks",
  "Version marker text": "Version marker text",
  "Text to append to tasks when moved (e.g., 'version 1.0')": "Text to append to tasks when moved (e.g., 'version 1.0')",
  "Date marker text": "Date marker text",
  "Text to append to tasks when moved (e.g., 'archived on 2023-12-31')": "Text to append to tasks when moved (e.g., 'archived on 2023-12-31')",
  "Custom marker text": "Custom marker text",
  "Use {{DATE:format}} for date formatting (e.g., {{DATE:YYYY-MM-DD}}": "Use {{DATE:format}} for date formatting (e.g., {{DATE:YYYY-MM-DD}}",
  "Treat abandoned tasks as completed": "Treat abandoned tasks as completed",
  "If enabled, abandoned tasks will be treated as completed.": "If enabled, abandoned tasks will be treated as completed.",
  "Complete all moved tasks": "Complete all moved tasks",
  "If enabled, all moved tasks will be marked as completed.": "If enabled, all moved tasks will be marked as completed.",
  "With current file link": "With current file link",
  "A link to the current file will be added to the parent task of the moved tasks.": "A link to the current file will be added to the parent task of the moved tasks.",
  "Say Thank You": "Say Thank You",
  "Donate": "Donate",
  "If you like this plugin, consider donating to support continued development:": "If you like this plugin, consider donating to support continued development:",
  "Add number to the Progress Bar": "Add number to the Progress Bar",
  "Toggle this to allow this plugin to add tasks number to progress bar.": "Toggle this to allow this plugin to add tasks number to progress bar.",
  "Show percentage": "Show percentage",
  "Toggle this to allow this plugin to show percentage in the progress bar.": "Toggle this to allow this plugin to show percentage in the progress bar.",
  "Customize progress text": "Customize progress text",
  "Toggle this to customize text representation for different progress percentage ranges.": "Toggle this to customize text representation for different progress percentage ranges.",
  "Progress Ranges": "Progress Ranges",
  "Define progress ranges and their corresponding text representations.": "Define progress ranges and their corresponding text representations.",
  "Add new range": "Add new range",
  "Add a new progress percentage range with custom text": "Add a new progress percentage range with custom text",
  "Min percentage (0-100)": "Min percentage (0-100)",
  "Max percentage (0-100)": "Max percentage (0-100)",
  "Text template (use {{PROGRESS}})": "Text template (use {{PROGRESS}})",
  "Reset to defaults": "Reset to defaults",
  "Reset progress ranges to default values": "Reset progress ranges to default values",
  "Reset": "Reset",
  "Priority Picker Settings": "Priority Picker Settings",
  "Toggle to enable priority picker dropdown for emoji and letter format priorities.": "Toggle to enable priority picker dropdown for emoji and letter format priorities.",
  "Enable priority picker": "Enable priority picker",
  "Enable priority keyboard shortcuts": "Enable priority keyboard shortcuts",
  "Toggle to enable keyboard shortcuts for setting task priorities.": "Toggle to enable keyboard shortcuts for setting task priorities.",
  "Date picker": "Date picker",
  "Enable date picker": "Enable date picker",
  "Toggle this to enable date picker for tasks. This will add a calendar icon near your tasks which you can click to select a date.": "Toggle this to enable date picker for tasks. This will add a calendar icon near your tasks which you can click to select a date.",
  "Date mark": "Date mark",
  "Emoji mark to identify dates. You can use multiple emoji separated by commas.": "Emoji mark to identify dates. You can use multiple emoji separated by commas.",
  "Quick capture": "Quick capture",
  "Enable quick capture": "Enable quick capture",
  "Toggle this to enable Org-mode style quick capture panel. Press Alt+C to open the capture panel.": "Toggle this to enable Org-mode style quick capture panel. Press Alt+C to open the capture panel.",
  "Target file": "Target file",
  "The file where captured text will be saved. You can include a path, e.g., 'folder/Quick Capture.md'": "The file where captured text will be saved. You can include a path, e.g., 'folder/Quick Capture.md'",
  "Placeholder text": "Placeholder text",
  "Placeholder text to display in the capture panel": "Placeholder text to display in the capture panel",
  "Append to file": "Append to file",
  "If enabled, captured text will be appended to the target file. If disabled, it will replace the file content.": "If enabled, captured text will be appended to the target file. If disabled, it will replace the file content.",
  "Task Filter": "Task Filter",
  "Enable Task Filter": "Enable Task Filter",
  "Toggle this to enable the task filter panel": "Toggle this to enable the task filter panel",
  "Preset Filters": "Preset Filters",
  "Create and manage preset filters for quick access to commonly used task filters.": "Create and manage preset filters for quick access to commonly used task filters.",
  "Edit Filter: ": "Edit Filter: ",
  "Filter name": "Filter name",
  "Task Status": "Task Status",
  "Include or exclude tasks based on their status": "Include or exclude tasks based on their status",
  "Include Completed Tasks": "Include Completed Tasks",
  "Include In Progress Tasks": "Include In Progress Tasks",
  "Include Abandoned Tasks": "Include Abandoned Tasks",
  "Include Not Started Tasks": "Include Not Started Tasks",
  "Include Planned Tasks": "Include Planned Tasks",
  "Related Tasks": "Related Tasks",
  "Include parent, child, and sibling tasks in the filter": "Include parent, child, and sibling tasks in the filter",
  "Include Parent Tasks": "Include Parent Tasks",
  "Include Child Tasks": "Include Child Tasks",
  "Include Sibling Tasks": "Include Sibling Tasks",
  "Advanced Filter": "Advanced Filter",
  "Use boolean operations: AND, OR, NOT. Example: 'text content AND #tag1'": "Use boolean operations: AND, OR, NOT. Example: 'text content AND #tag1'",
  "Filter query": "Filter query",
  "Filter out tasks": "Filter out tasks",
  "If enabled, tasks that match the query will be hidden, otherwise they will be shown": "If enabled, tasks that match the query will be hidden, otherwise they will be shown",
  "Save": "Save",
  "Cancel": "Cancel",
  "Hide filter panel": "Hide filter panel",
  "Show filter panel": "Show filter panel",
  "Filter Tasks": "Filter Tasks",
  "Preset filters": "Preset filters",
  "Select a saved filter preset to apply": "Select a saved filter preset to apply",
  "Select a preset...": "Select a preset...",
  "Query": "Query",
  "Use boolean operations: AND, OR, NOT. Example: 'text content AND #tag1 AND DATE:<2022-01-02 NOT PRIORITY:>=#B' - Supports >, <, =, >=, <=, != for PRIORITY and DATE.": "Use boolean operations: AND, OR, NOT. Example: 'text content AND #tag1 AND DATE:<2022-01-02 NOT PRIORITY:>=#B' - Supports >, <, =, >=, <=, != for PRIORITY and DATE.",
  "If true, tasks that match the query will be hidden, otherwise they will be shown": "If true, tasks that match the query will be hidden, otherwise they will be shown",
  "Completed": "Completed",
  "In Progress": "In Progress",
  "Abandoned": "Abandoned",
  "Not Started": "Not Started",
  "Planned": "Planned",
  "Include Related Tasks": "Include Related Tasks",
  "Parent Tasks": "Parent Tasks",
  "Child Tasks": "Child Tasks",
  "Sibling Tasks": "Sibling Tasks",
  "Apply": "Apply",
  "New Preset": "New Preset",
  "Preset saved": "Preset saved",
  "No changes to save": "No changes to save",
  "Close": "Close",
  "Capture to": "Capture to",
  "Capture": "Capture",
  "Capture thoughts, tasks, or ideas...": "Capture thoughts, tasks, or ideas...",
  "Tomorrow": "Tomorrow",
  "In 2 days": "In 2 days",
  "In 3 days": "In 3 days",
  "In 5 days": "In 5 days",
  "In 1 week": "In 1 week",
  "In 10 days": "In 10 days",
  "In 2 weeks": "In 2 weeks",
  "In 1 month": "In 1 month",
  "In 2 months": "In 2 months",
  "In 3 months": "In 3 months",
  "In 6 months": "In 6 months",
  "In 1 year": "In 1 year",
  "In 5 years": "In 5 years",
  "In 10 years": "In 10 years",
  "Highest priority": "Highest priority",
  "High priority": "High priority",
  "Medium priority": "Medium priority",
  "No priority": "No priority",
  "Low priority": "Low priority",
  "Lowest priority": "Lowest priority",
  "Priority A": "Priority A",
  "Priority B": "Priority B",
  "Priority C": "Priority C",
  "Task Priority": "Task Priority",
  "Remove Priority": "Remove Priority",
  "Cycle task status forward": "Cycle task status forward",
  "Cycle task status backward": "Cycle task status backward",
  "Remove priority": "Remove priority",
  "Move task to another file": "Move task to another file",
  "Move all completed subtasks to another file": "Move all completed subtasks to another file",
  "Move direct completed subtasks to another file": "Move direct completed subtasks to another file",
  "Move all subtasks to another file": "Move all subtasks to another file",
  "Set priority": "Set priority",
  "Toggle quick capture panel": "Toggle quick capture panel",
  "Quick capture (Global)": "Quick capture (Global)",
  "Toggle task filter panel": "Toggle task filter panel",
  "Filter Mode": "Filter Mode",
  "Choose whether to include or exclude tasks that match the filters": "Choose whether to include or exclude tasks that match the filters",
  "Show matching tasks": "Show matching tasks",
  "Hide matching tasks": "Hide matching tasks",
  "Choose whether to show or hide tasks that match the filters": "Choose whether to show or hide tasks that match the filters",
  "Create new file:": "Create new file:",
  "Completed tasks moved to": "Completed tasks moved to",
  "Failed to create file:": "Failed to create file:",
  "Beginning of file": "Beginning of file",
  "Failed to move tasks:": "Failed to move tasks:",
  "No active file found": "No active file found",
  "Task moved to": "Task moved to",
  "Failed to move task:": "Failed to move task:",
  "Nothing to capture": "Nothing to capture",
  "Captured successfully": "Captured successfully",
  "Failed to save:": "Failed to save:",
  "Captured successfully to": "Captured successfully to",
  "Total": "Total",
  "Workflow": "Workflow",
  "Add as workflow root": "Add as workflow root",
  "Move to stage": "Move to stage",
  "Complete stage": "Complete stage",
  "Add child task with same stage": "Add child task with same stage",
  "Could not open quick capture panel in the current editor": "Could not open quick capture panel in the current editor",
  "Just started {{PROGRESS}}%": "Just started {{PROGRESS}}%",
  "Making progress {{PROGRESS}}%": "Making progress {{PROGRESS}}%",
  "Half way {{PROGRESS}}%": "Half way {{PROGRESS}}%",
  "Good progress {{PROGRESS}}%": "Good progress {{PROGRESS}}%",
  "Almost there {{PROGRESS}}%": "Almost there {{PROGRESS}}%",
  "Progress bar": "Progress bar",
  "You can customize the progress bar behind the parent task(usually at the end of the task). You can also customize the progress bar for the task below the heading.": "You can customize the progress bar behind the parent task(usually at the end of the task). You can also customize the progress bar for the task below the heading.",
  "Hide progress bars": "Hide progress bars",
  "Parent task changer": "Parent task changer",
  "Change the parent task of the current task.": "Change the parent task of the current task.",
  "No preset filters created yet. Click 'Add New Preset' to create one.": "No preset filters created yet. Click 'Add New Preset' to create one.",
  "Configure task workflows for project and process management": "Configure task workflows for project and process management",
  "Enable workflow": "Enable workflow",
  "Toggle to enable the workflow system for tasks": "Toggle to enable the workflow system for tasks",
  "Auto-add timestamp": "Auto-add timestamp",
  "Automatically add a timestamp to the task when it is created": "Automatically add a timestamp to the task when it is created",
  "Timestamp format:": "Timestamp format:",
  "Timestamp format": "Timestamp format",
  "Remove timestamp when moving to next stage": "Remove timestamp when moving to next stage",
  "Remove the timestamp from the current task when moving to the next stage": "Remove the timestamp from the current task when moving to the next stage",
  "Calculate spent time": "Calculate spent time",
  "Calculate and display the time spent on the task when moving to the next stage": "Calculate and display the time spent on the task when moving to the next stage",
  "Format for spent time:": "Format for spent time:",
  "Calculate spent time when move to next stage.": "Calculate spent time when move to next stage.",
  "Spent time format": "Spent time format",
  "Calculate full spent time": "Calculate full spent time",
  "Calculate the full spent time from the start of the task to the last stage": "Calculate the full spent time from the start of the task to the last stage",
  "Auto remove last stage marker": "Auto remove last stage marker",
  "Automatically remove the last stage marker when a task is completed": "Automatically remove the last stage marker when a task is completed",
  "Auto-add next task": "Auto-add next task",
  "Automatically create a new task with the next stage when completing a task": "Automatically create a new task with the next stage when completing a task",
  "Workflow definitions": "Workflow definitions",
  "Configure workflow templates for different types of processes": "Configure workflow templates for different types of processes",
  "No workflow definitions created yet. Click 'Add New Workflow' to create one.": "No workflow definitions created yet. Click 'Add New Workflow' to create one.",
  "Edit workflow": "Edit workflow",
  "Remove workflow": "Remove workflow",
  "Delete workflow": "Delete workflow",
  "Delete": "Delete",
  "Add New Workflow": "Add New Workflow",
  "New Workflow": "New Workflow",
  "Create New Workflow": "Create New Workflow",
  "Workflow name": "Workflow name",
  "A descriptive name for the workflow": "A descriptive name for the workflow",
  "Workflow ID": "Workflow ID",
  "A unique identifier for the workflow (used in tags)": "A unique identifier for the workflow (used in tags)",
  "Description": "Description",
  "Optional description for the workflow": "Optional description for the workflow",
  "Describe the purpose and use of this workflow...": "Describe the purpose and use of this workflow...",
  "Workflow Stages": "Workflow Stages",
  "No stages defined yet. Add a stage to get started.": "No stages defined yet. Add a stage to get started.",
  "Edit": "Edit",
  "Move up": "Move up",
  "Move down": "Move down",
  "Sub-stage": "Sub-stage",
  "Sub-stage name": "Sub-stage name",
  "Sub-stage ID": "Sub-stage ID",
  "Next: ": "Next: ",
  "Add Sub-stage": "Add Sub-stage",
  "New Sub-stage": "New Sub-stage",
  "Edit Stage": "Edit Stage",
  "Stage name": "Stage name",
  "A descriptive name for this workflow stage": "A descriptive name for this workflow stage",
  "Stage ID": "Stage ID",
  "A unique identifier for the stage (used in tags)": "A unique identifier for the stage (used in tags)",
  "Stage type": "Stage type",
  "The type of this workflow stage": "The type of this workflow stage",
  "Linear (sequential)": "Linear (sequential)",
  "Cycle (repeatable)": "Cycle (repeatable)",
  "Terminal (end stage)": "Terminal (end stage)",
  "Next stage": "Next stage",
  "The stage to proceed to after this one": "The stage to proceed to after this one",
  "Sub-stages": "Sub-stages",
  "Define cycle sub-stages (optional)": "Define cycle sub-stages (optional)",
  "No sub-stages defined yet.": "No sub-stages defined yet.",
  "Can proceed to": "Can proceed to",
  "Additional stages that can follow this one (for right-click menu)": "Additional stages that can follow this one (for right-click menu)",
  "No additional destination stages defined.": "No additional destination stages defined.",
  "Remove": "Remove",
  "Add": "Add",
  "Name and ID are required.": "Name and ID are required.",
  "End of file": "End of file",
  "Include in cycle": "Include in cycle",
  "Preset": "Preset",
  "Preset name": "Preset name",
  "Edit Filter": "Edit Filter",
  "Add New Preset": "Add New Preset",
  "New Filter": "New Filter",
  "Reset to Default Presets": "Reset to Default Presets",
  "This will replace all your current presets with the default set. Are you sure?": "This will replace all your current presets with the default set. Are you sure?",
  "Edit Workflow": "Edit Workflow",
  "General": "General",
  "Progress Bar": "Progress Bar",
  "Task Mover": "Task Mover",
  "Quick Capture": "Quick Capture",
  "Date & Priority": "Date & Priority",
  "About": "About",
  "Count sub children of current Task": "Count sub children of current Task",
  "Toggle this to allow this plugin to count sub tasks when generating progress bar\t.": "Toggle this to allow this plugin to count sub tasks when generating progress bar\t.",
  "Configure task status settings": "Configure task status settings",
  "Configure which task markers to count or exclude": "Configure which task markers to count or exclude",
  "Task status cycle and marks": "Task status cycle and marks",
  "About Task Genius": "About Task Genius",
  "Version": "Version",
  "Documentation": "Documentation",
  "View the documentation for this plugin": "View the documentation for this plugin",
  "Open Documentation": "Open Documentation",
  "Incomplete tasks": "Incomplete tasks",
  "In progress tasks": "In progress tasks",
  "Completed tasks": "Completed tasks",
  "All tasks": "All tasks"
};

export default translations;
