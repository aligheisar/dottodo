import * as vscode from "vscode";
// import { nanoid } from "nanoid";
import { TodoWebviewProvider } from "./todoWebview";
import { TodoManager } from "./todoManager";
import { COMMANDS } from "./constants/commands";

let TodoWebviewProviderInstance: TodoWebviewProvider;

export function activate(context: vscode.ExtensionContext) {
  const init = vscode.commands.registerCommand(COMMANDS.INIT, () => {
    TodoManager.initializeTodoFiles();

    TodoWebviewProviderInstance.updateTodos();
  });

  const updateTodoList = vscode.commands.registerCommand(
    COMMANDS.UPDATE_TODO_LIST,
    () => {
      TodoWebviewProviderInstance.updateTodos();
    }
  );

  const addTodo = vscode.commands.registerCommand(
    COMMANDS.ADD_TODO,
    async () => {
      const result = await vscode.window.showInputBox({
        placeHolder: "Enter todo content",
        title: "Add Todo",
      });

      if (result) {
        // !!! use todo maker
        TodoWebviewProviderInstance.addTodo({
          created: new Date().toString(),
          done: false,
          id: "slkfjds",
          priority: "medium",
          task: "some task",
        });
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
