import * as vscode from 'vscode';
import { SveltePanel } from './panel';
import { SvelteViewProvider } from './viewprovider';

export function activate(context: vscode.ExtensionContext) {
	const provider = new SvelteViewProvider(context.extensionUri);

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider('dephelper-vscode.dephelper', provider));
	
	context.subscriptions.push(vscode.commands.registerCommand('dephelper-vscode.openEditor', () => {
		SveltePanel.render("showPanel", "DepHelper", context.extensionUri);

		// Your setup should go here (things like posting things to the front end)
		// This is an example
	}));

	console.log("dephelper: registered!");
}

export function deactivate() {}
