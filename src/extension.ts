import * as vscode from 'vscode';

const getTextToRun = (editor: vscode.TextEditor) => {
	if (editor.selection.isEmpty) {
		const lineIndex = editor.selection.active.line;
		return editor.document.lineAt(lineIndex).text;
	} else {
		return editor.document.getText(editor.selection);
	}
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
}

export function deactivate() {}
