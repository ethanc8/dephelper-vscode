import * as vscode from 'vscode';
import { SveltePanel } from './panel';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('dephelper-vscode.helloWorld', () => {
		SveltePanel.render("showPanel", "DepHelper", context.extensionUri);

		// Your setup should go here (things like posting things to the front end)
		// This is an example
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
