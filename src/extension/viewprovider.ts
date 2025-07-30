import * as vscode from "vscode";
import { Uri, WebviewPanel, Disposable, ViewColumn, Webview } from "vscode";

interface Payload {
	title: string;
	msg: string;
}

function getUri(webview: Webview, extensionUri: Uri, pathList: string[]) {
	return webview.asWebviewUri(Uri.joinPath(extensionUri, ...pathList));
}

export function getNonce() {
	let text = "";
	const possible =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

export class SvelteViewProvider implements vscode.WebviewViewProvider {
	private _view?: vscode.WebviewView;
	private disposables: Disposable[] = [];
	
	constructor(
		private readonly _extensionUri: vscode.Uri,
	) { }

	public resolveWebviewView(
		webviewView: vscode.WebviewView,
		_context: vscode.WebviewViewResolveContext,
		_token: vscode.CancellationToken,
	) {
		this._view = webviewView;

		webviewView.webview.options = {
			// Allow scripts in the webview
			enableScripts: true,

			localResourceRoots: [
				this._extensionUri
			]
		};

		webviewView.webview.html = this.getWebviewContent(webviewView.webview, this._extensionUri);
		this.setWebviewMessageListener(webviewView.webview);
	}
	
	public getWebviewContent(webview: Webview, uri: Uri) {
		const scriptUri = getUri(webview, uri, ["out", "compiled", "bundle.js"]);
		const styleUri = getUri(webview, uri, ["out", "compiled", "bundle.css"]);
		const codiconsUri = getUri(webview, uri, ["node_modules", "@vscode/codicons", "dist", "codicon.css"]);
		const nonce = getNonce();

		return /*html*/ `
			<!DOCTYPE html>
			<html lang="en">
				<head>
					<title>Hello World</title>
					<meta charset="UTF-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<!-- <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; font-src ${webview.cspSource}; script-src 'nonce-${nonce}';"> --> 
					<link href="${codiconsUri}" rel="stylesheet" id="vscode-codicon-stylesheet" />
					<link href="${styleUri}" rel="stylesheet" />
					<script defer nonce="${nonce}" src="${scriptUri}"></script>
				</head>
				<body id="app">
				</body>
			</html>
		`;
	}

	public post(content: Payload) {
		if(this._view) {
			this._view.webview.postMessage(content);
		}
	}

	public dispose() {
		while (this.disposables.length) {
			const disposable = this.disposables.pop();
			if (disposable) {
				disposable.dispose();
			}
		}
	}

	private setWebviewMessageListener(webview: Webview) {
		webview.onDidReceiveMessage(
			(message: Payload) => {
				const command = message.title;
				const text = message.msg;

				// Add more commands here
				switch (command) {
					case "hello":
						vscode.window.showInformationMessage(text);
						return;
				}
			},
			undefined,
			this.disposables
		);
	}
}
