import { Priority, Todo } from "../types";
import { nanoid } from "nanoid";

export const generateTodo = (task: string, priority: Priority): Todo => {
  return {
    created: new Date().toString(),
    done: false,
    id: nanoid(),
    priority,
    task,
  };
};
