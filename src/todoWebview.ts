import * as vscode from "vscode";
import { TODO_PANEL_ID } from "./constants/general";
import { COMMANDS, POST_COMMANDS } from "./constants/commands";
import { Message, Priority } from "./types";
import {
  addTodo,
  editTodo,
  removeTodo,
  updateTodoList,
} from "./utils/postMessageFunctions";

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

    webviewView.webview.onDidReceiveMessage((message: Message<any>) => {
      switch (message.command) {
        case POST_COMMANDS.INIT:
          vscode.commands.executeCommand(COMMANDS.INIT);
          break;

        case POST_COMMANDS.LOADED:
          updateTodoList(webviewView);
          break;

        case POST_COMMANDS.UPDATE_TODO_LIST:
          vscode.commands.executeCommand(COMMANDS.UPDATE_TODO_LIST);
          break;

        case POST_COMMANDS.ADD_TODO:
          if (!message.data) return;
          addTodo(webviewView, message.data.task, message.data.priority);
          break;

        case POST_COMMANDS.REMOVE_TODO:
          if (!message.data) return;
          removeTodo(webviewView, message.data);
          break;

        case POST_COMMANDS.EDIT_TODO:
          if (!message.data) return;
          editTodo(webviewView, message.data);
          break;

        default:
          break;
      }
    });
  }

  public updateTodoList() {
    if (this._view) {
      updateTodoList(this._view);
    }
  }

  public addTodo(task: string, priority: Priority) {
    if (this._view) {
      addTodo(this._view, task, priority);
    }
  }

  public removeTodo(id: string) {
    if (this._view) {
      removeTodo(this._view, id);
    }
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
