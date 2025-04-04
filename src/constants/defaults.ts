import { Settings, Todo } from "../types";

export const DEFAULT_SETTINGS: Settings = {
  defaultPriority: "medium",
  showCompleted: true,
  moveCompletedToBottom: true,
  sortBy: "created",
};

export const DEFAULT_TODOS: Todo[] = [];
