import * as vscode from "vscode";
import { Message, Priority, Todo } from "../types";
import { TodoManager } from "../todoManager";
import { POST_COMMANDS } from "../constants/commands";
import { generateTodo } from "./todoMaker";

export const updateTodoList = (
  webviewView: vscode.WebviewView,
  inputTodos?: Todo[] | null
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

export const addTodo = (
  webviewView: vscode.WebviewView,
  task: string,
  priority: Priority
) => {
  const todos = TodoManager.addTodo(generateTodo(task, priority));
  updateTodoList(webviewView, todos);
};

export const removeTodo = (webviewView: vscode.WebviewView, id: string) => {
  const todos = TodoManager.removeTodo(id);
  updateTodoList(webviewView, todos);
};

export const editTodo = async (webviewView: vscode.WebviewView, id: string) => {
  const todos = await TodoManager.editTodo(id);
  updateTodoList(webviewView, todos);
};
