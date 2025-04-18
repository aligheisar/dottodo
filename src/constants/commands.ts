import { EXTENSION_NAME } from "./general";

export const COMMANDS = {
  INIT: `${EXTENSION_NAME}.init`,
  ADD_TODO: `${EXTENSION_NAME}.add-todo`,
  REMOVE_TODO: `${EXTENSION_NAME}.remove-todo`,
  EDIT_TODO: `${EXTENSION_NAME}.edit-todo`,
  UPDATE_TODO_LIST: `${EXTENSION_NAME}.update-todo-list`,
} as const;

export const POST_COMMANDS = {
  INIT: "init",
  LOADED: "loaded",
  ADD_TODO: "add-todo",
  REMOVE_TODO: "remove-todo",
  EDIT_TODO: "edit-todo",
  UPDATE_TODO_LIST: "update-todo-list",
  UPDATE_SETTINGS: "update-settings",
} as const;
