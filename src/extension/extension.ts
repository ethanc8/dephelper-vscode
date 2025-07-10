import * as vscode from 'vscode';
import { SveltePanel } from './panel';

export function activate(context: vscode.ExtensionContext) {
  const provider = new ColorsViewProvider(context.extensionUri);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(ColorsViewProvider.viewType, provider));
  
  context.subscriptions.push(vscode.commands.registerCommand('dephelper-vscode.helloWorld', () => {
    SveltePanel.render("showPanel", "DepHelper", context.extensionUri);
    provider.show();

    // Your setup should go here (things like posting things to the front end)
    // This is an example
  }));

  console.log("dephelper: registered!");
}

export function deactivate() {}

// see https://github.com/microsoft/vscode-extension-samples/blob/main/webview-view-sample/src/extension.ts
class ColorsViewProvider implements vscode.WebviewViewProvider {

  public static readonly viewType = 'dephelper-vscode.dephelper';

  private _view?: vscode.WebviewView;

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

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    // webviewView.webview.onDidReceiveMessage(data => {
    //   switch (data.type) {
    //     case 'colorSelected':
    //       {
    //         vscode.window.activeTextEditor?.insertSnippet(new vscode.SnippetString(`#${data.value}`));
    //         break;
    //       }
    //   }
    // });
  }

  public show() {
    if(this._view) {
      this._view.show(true);
    } else {
      console.log("dephelper: this._view doesn't exist");
    }
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    // // Get the local path to main script run in the webview, then convert it to a uri we can use in the webview.
    // const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'main.js'));

    // // Do the same for the stylesheet.
    // const styleResetUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'reset.css'));
    // const styleVSCodeUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'vscode.css'));
    // const styleMainUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'main.css'));

    // Use a nonce to only allow a specific script to be run.
    const nonce = getNonce();

    console.log("dephelper: got HTML!");

    return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>Cat Colors</title>
      </head>
      <body>
        Hello world
      </body>
      </html>`;
  }
}

function getNonce() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
