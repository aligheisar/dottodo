import * as vscode from "vscode";
import { TodoWebviewProvider } from "./todoWebview";
import { TodoManager } from "./todoManager";
import { COMMANDS } from "./constants/commands";
import { Priority } from "./types";

let TodoWebviewProviderInstance: TodoWebviewProvider;

export function activate(context: vscode.ExtensionContext) {
  const init = vscode.commands.registerCommand(COMMANDS.INIT, () => {
    TodoManager.initializeTodoFiles();

    TodoWebviewProviderInstance.updateTodoList();
  });

  const updateTodoList = vscode.commands.registerCommand(
    COMMANDS.UPDATE_TODO_LIST,
    () => {
      TodoWebviewProviderInstance.updateTodoList();
    }
  );

  const addTodo = vscode.commands.registerCommand(
    COMMANDS.ADD_TODO,
    async () => {
      const resultTask = await vscode.window.showInputBox({
        placeHolder: "Enter todo content",
        title: "Add Todo",
      });

      const priority = ["high", "medium", "low"];

      const resultPriority = await vscode.window.showQuickPick(priority, {
        title: "choose a priority",
      });

      if (resultTask) {
        TodoWebviewProviderInstance.addTodo(
          resultTask,
          (resultPriority as Priority) || "medium"
        );
      }
    }
  );

  TodoWebviewProviderInstance = new TodoWebviewProvider(context.extensionUri);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      TodoWebviewProvider.viewType,
      TodoWebviewProviderInstance
    )
  );

  context.subscriptions.push(init, updateTodoList, addTodo);
}

export function deactivate() {}
