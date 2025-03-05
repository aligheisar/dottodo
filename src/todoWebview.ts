import * as vscode from "vscode";
import { TodoManager } from "./todoManager";
import { TODO_PANEL_ID } from "./constants/general";
import { COMMANDS, POST_COMMANDS } from "./constants/commands";
import { Message, Todo } from "./types";

export class TodoWebviewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = TODO_PANEL_ID;
  private _view?: vscode.WebviewView;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [vscode.Uri.joinPath(this._extensionUri, "dist")],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    webviewView.webview.onDidReceiveMessage((message: Message) => {
      if (message.command === POST_COMMANDS.INIT) {
        vscode.commands.executeCommand(COMMANDS.INIT);
      } else if (message.command === POST_COMMANDS.LOADED) {
        const todos = TodoManager.getTodos();
        webviewView.webview.postMessage<Message<Todo[] | null>>({
          command: POST_COMMANDS.UPDATE_TODO,
          data: todos,
        });
      } else if (message.command) {
      }
    });
  }

  private _getHtmlForWebview(webview: vscode.Webview): string {
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "dist", "webview.js")
    );
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Todos</title>
      </head>
      <body>
        <div id="root"></div>
        <script src="${scriptUri}"></script>
      </body>
      </html>
    `;
  }
}
