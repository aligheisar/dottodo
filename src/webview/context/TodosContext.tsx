import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { Message, Todo } from "../../types";
import { getVSCodeApi } from "../VsCodeApi";
import { POST_COMMANDS } from "../../constants/commands";

export type ContextValues = {
  todos: Todo[] | null;
};

const TodosContext = createContext<ContextValues>({ todos: null });

export const GetTodos = () => useContext(TodosContext);

const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[] | null>(null);

  const vscode = getVSCodeApi();

  useEffect(() => {
    window.addEventListener(
      "message",
      (event: MessageEvent<Message<Todo[]>>) => {
        if (event.data.command === POST_COMMANDS.UPDATE_TODO) {
          setTodos(event.data?.data ?? []);
        }
      }
    );

    vscode.postMessage({
      command: POST_COMMANDS.LOADED,
    });
  }, []);

  const contextValues: ContextValues = { todos: todos };
  return (
    <TodosContext.Provider value={contextValues}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodosProvider;
