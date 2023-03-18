import * as vscode from 'vscode';

const getTextToRun = (editor: vscode.TextEditor) => {
	if (editor.selection.isEmpty) {
		const lineIndex = editor.selection.active.line;
		return editor.document.lineAt(lineIndex).text.trim();
	} else {
		return editor.document.getText(editor.selection);
	}
};

const findFirstLineIndexOfBlock = (document: vscode.TextDocument, beforeLineIndex: number): number => {
	if (beforeLineIndex === 0) { return 0; }
	if (document.lineAt(beforeLineIndex - 1).isEmptyOrWhitespace) { return beforeLineIndex; }
	return findFirstLineIndexOfBlock(document, beforeLineIndex - 1);
};

const getBlockToRun = (editor: vscode.TextEditor) => {
	const cursorLineIndex = editor.selection.active.line;
	if (editor.document.lineAt(cursorLineIndex).isEmptyOrWhitespace) {
		return "";
	}

	const startLineIndex = findFirstLineIndexOfBlock(editor.document, cursorLineIndex);
	const lines = [];

	for (let index = startLineIndex; index < editor.document.lineCount; index++) {
		const line = editor.document.lineAt(index);
		if(line.isEmptyOrWhitespace){ break; }
		lines.push(line.text);
	}

	return lines.join('\n');
};

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('termilizer.pasteLineToTerminal', () => {
    const editor = vscode.window.activeTextEditor;
		const terminal = vscode.window.activeTerminal;
		if (!editor || !terminal) {
			vscode.window.showInformationMessage("Need to have an active editor and an active terminal");
			return;
		}

		const textToRun = getTextToRun(editor);
		terminal.sendText(textToRun);
	});

	context.subscriptions.push(disposable);

	let desposable2 = vscode.commands.registerCommand('termilizer.pasteBlockToTerminal', () => {
    const editor = vscode.window.activeTextEditor;
		const terminal = vscode.window.activeTerminal;
		if (!editor || !terminal) {
			vscode.window.showInformationMessage("Need to have an active editor and an active terminal");
			return;
		}

		const textToRun = getBlockToRun(editor);
		terminal.sendText(textToRun);
	});

	context.subscriptions.push(disposable2);
}

export function deactivate() {}
