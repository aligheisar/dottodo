import * as vscode from "vscode";
import { TodoWebviewProvider } from "./todoWebview";
import { TodoManager } from "./todoManager";
import { COMMANDS } from "./constants/commands";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(COMMANDS.INIT, () => {
    TodoManager.initializeTodoFiles();
  });

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      TodoWebviewProvider.viewType,
      new TodoWebviewProvider(context.extensionUri)
    )
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
