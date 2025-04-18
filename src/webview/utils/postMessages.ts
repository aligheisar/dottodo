import { getVSCodeApi } from "../VsCodeApi";
import type { Message, Priority } from "../../types";
import { POST_COMMANDS } from "../../constants/commands";

const vscode = getVSCodeApi();

export const initMessage = () => {
  vscode.postMessage<Message>({
    command: POST_COMMANDS.INIT,
  });
};

export const loadedMessage = () => {
  vscode.postMessage({
    command: POST_COMMANDS.LOADED,
  });
};

export const updateTodosListMessage = () => {
  vscode.postMessage({
    command: POST_COMMANDS.UPDATE_TODO_LIST,
  });
};

export const addTodoMessage = (task: string, priority: Priority) => {
  vscode.postMessage({
    command: POST_COMMANDS.ADD_TODO,
    data: { task, priority },
  });
};

export const removeTodoMessage = (id: string) => {
  vscode.postMessage({
    command: POST_COMMANDS.REMOVE_TODO,
    data: id,
  });
};

export const editTodoMessage = (id: string) => {
  vscode.postMessage({
    command: POST_COMMANDS.EDIT_TODO,
    data: id,
  });
};
