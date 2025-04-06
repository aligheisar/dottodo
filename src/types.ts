import { POST_COMMANDS } from "./constants/commands";

export interface Settings {
  defaultPriority: "low" | "medium" | "high";
  showCompleted: boolean;
  moveCompletedToBottom: boolean;
  sortBy: "created" | "priority" | "task";
}

export interface Todo {
  id: string;
  task: string;
  done: boolean;
  created: string;
  priority: "low" | "medium" | "high";
}

export interface VSCodeAPI {
  postMessage<T = Message>(message: T): void;
  getState<T = any>(): T | undefined;
  setState<T = any>(newState: T): void;
}

export type PostCommand = (typeof POST_COMMANDS)[keyof typeof POST_COMMANDS];

export interface Message<T = undefined> {
  command: PostCommand;
  data?: T extends undefined ? never : T;
}

// packagejson
type activityBarItem = {
  icon?: string;
  id: string;
  title: string;
};

interface viewsContainers {
  activitybar?: activityBarItem[];
}

interface command {
  category: string;
  command: string;
  enablement?: string;
  icon?: string;
  shortTitle?: string;
  title: string;
}

type viewTypes = "webview" | "tree";
type viewVisibility = "visible" | "hidden" | "collapsed";

type viewItem = {
  accessibilityHelpContent?: string;
  icon?: string;
  contextualTitle?: string;
  id: string;
  initialSize?: number;
  name: string;
  type: viewTypes;
  visibility?: viewVisibility;
  when?: string;
};

interface views {
  [key: string]: viewItem[];
}

type contributes = {
  commands?: command[];
  viewsContainers: viewsContainers;
  views: views;
};

export interface packageJson {
  name: string;
  contributes: contributes;
}
