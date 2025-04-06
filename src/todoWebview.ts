import * as vscode from "vscode";
import { TODO_PANEL_ID } from "./constants/general";
import { COMMANDS, POST_COMMANDS } from "./constants/commands";
import { Message, Todo } from "./types";
import { addTodo, updateTodos } from "./utils/postMessageFunctions";

export class TodoWebviewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = TODO_PANEL_ID;
  private _view?: vscode.WebviewView;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken,
  ) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [vscode.Uri.joinPath(this._extensionUri, "dist")],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    webviewView.webview.onDidReceiveMessage((message: Message) => {
      switch (message.command) {
        case POST_COMMANDS.INIT:
          vscode.commands.executeCommand(COMMANDS.INIT);
          break;

        case POST_COMMANDS.LOADED:
          updateTodos(webviewView);
          break;

        case POST_COMMANDS.UPDATE_TODO_LIST:
          vscode.commands.executeCommand(COMMANDS.UPDATE_TODO_LIST);
          break;

        case POST_COMMANDS.ADD_TODO:
          if (!message.data) return;
          addTodo(webviewView, message.data);
          break;

        default:
          break;
      }
    });
  }

  public updateTodos() {
    if (this._view) {
      updateTodos(this._view);
    }
  }

  public addTodo(todo: Todo) {
    if (this._view) {
      addTodo(this._view, todo);
    }
  }

  private _getHtmlForWebview(webview: vscode.Webview): string {
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "dist", "webview.js"),
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
