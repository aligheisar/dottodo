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
