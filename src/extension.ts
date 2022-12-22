import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('vs-code-slime.helloWorld', () => {
    const editor = vscode.window.activeTextEditor;
		const terminal = vscode.window.activeTerminal;
		if (!editor || !terminal) {
			vscode.window.showInformationMessage("Derp");
			return;
		}

		const lineIndex = editor.selection.active.line;
		const lineText = editor.document.lineAt(lineIndex).text;
		terminal.sendText(lineText);

		vscode.window.showInformationMessage(`Hello: active.line text: '${lineText}'`);
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
