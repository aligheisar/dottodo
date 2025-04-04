import { EXTENSION_NAME } from "./general";

export const COMMANDS = {
  INIT: `${EXTENSION_NAME}.init`,
  ADD_TODO: `${EXTENSION_NAME}.add-todo`,
} as const;

export const POST_COMMANDS = {
  INIT: "init",
  LOADED: "loaded",
  UPDATE_TODO: "update-todo",
  UPDATE_SETTINGS: "update-settings",
} as const;
