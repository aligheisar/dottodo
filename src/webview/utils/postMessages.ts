import { getVSCodeApi } from "../VsCodeApi";
import type { Message, Todo } from "../../types";
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

export const addTodoMessage = (todo: Todo) => {
  vscode.postMessage({
    command: POST_COMMANDS.ADD_TODO,
    data: todo,
  });
};
