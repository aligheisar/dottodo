import * as vscode from "vscode";
import { Message, Todo } from "../types";
import { TodoManager } from "../todoManager";
import { POST_COMMANDS } from "../constants/commands";

export const updateTodos = (
  webviewView: vscode.WebviewView,
  inputTodos?: Todo[] | null,
) => {
  let todos: Todo[] | null;

  if (!inputTodos) {
    todos = TodoManager.getTodos();
  } else {
    todos = inputTodos;
  }

  webviewView.webview.postMessage<Message<Todo[] | null>>({
    command: POST_COMMANDS.UPDATE_TODO_LIST,
    data: todos,
  });
};

export const addTodo = (webviewView: vscode.WebviewView, todo: Todo) => {
  const todos = TodoManager.addTodo(todo);
  updateTodos(webviewView, todos);
};
