import { Priority, Todo } from "../types";
import { formatDate } from "./formatDate";

export const generateTodo = (task: string, priority: Priority): Todo => {
  const date = new Date();
  return {
    created: formatDate(date),
    done: false,
    id: Math.random().toString(),
    priority,
    task,
  };
};
