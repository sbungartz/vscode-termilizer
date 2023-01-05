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
	const startLineIndex = findFirstLineIndexOfBlock(editor.document, cursorLineIndex);

	return "";
};

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('vs-code-slime.helloWorld', () => {
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

	let disposable2 = vscode.commands.registerCommand('vs-code-slime.pasteBlockToTerminal', () => {
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
