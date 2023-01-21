# Termilizer VS Code extension

Paste the line or block of code under your cursor to the active terminal without ever changing focus.
Perfect for trying out code in any REPL.

Inspired by the [vim-slime](https://github.com/jpalardy/vim-slime) plugin.

## Commands
The following commands are provided in the command pallete (press `Ctrl+Shift+P` or `CMD+Shift+P`).
Currently, no default keyboard shortcuts are provided, but can be configured in the VS Code Settings.
- Termilizer: Paste line under cursor to active terminal (`termilizer.pasteLineToTerminal`)
  - When nothing is selected, the line under your cursor will be pasted to the active terminal
  - When code is selected, only the selection will be pasted (multiple lines work as well)
  - Even if only part of a line is selected, a new line will be pasted as well, causing the pasted code to be executed immediatley.
- Termilizer: Paste block under cursor to active terminal (`termilizer.pasteBlockToTerminal`)
  - The block of code surrounding your cursor will be pasted to the active terminal
  - A "block of code" is only determined by empty lines. No language sematics are taken into account.

### :warning: Caution
Since we paste code into a terminal including at least one newline character, unforeseen things might happen.
Always make sure that you *know* which *terminal is currently active* and which *line(s) have focus* before you run any of they provided commands.

Please also note that VS Code considers the last terminal that had focus, when the Panel with the terminal is hidden.

## Known Issues

- "Paste block under cursor" only looks at where the cursor is and ignores selection.
- When multiple cursors are placed, only the first one is taken into account.

## Release Notes

See [CHANGELOG.md](CHANGELOG.md).
