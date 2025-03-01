export interface Settings {
  defaultPriority: "low" | "medium" | "high";
  showCompleted: boolean;
  sortBy: "created" | "priority" | "task";
}

export interface Todo {
  id: number;
  task: string;
  done: boolean;
  created: string;
  priority: "low" | "medium" | "high";
}

export interface VSCodeAPI {
  postMessage<T = any>(message: T): void;
  getState<T = any>(): T | undefined;
  setState<T = any>(newState: T): void;
}
