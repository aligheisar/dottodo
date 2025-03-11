import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { Todo } from "../../types";
import { getVSCodeApi } from "../VsCodeApi";
import { POST_COMMANDS } from "../../constants/commands";
import { useMessage } from "../hooks/use-message";

export type ContextValues = {
  todos: Todo[] | null;
};

const TodosContext = createContext<ContextValues>({ todos: null });

export const GetTodos = () => useContext(TodosContext);

const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[] | null>(null);

  const vscode = getVSCodeApi();

  useMessage({
    [POST_COMMANDS.UPDATE_TODO](data) {
      setTodos(data);
    },
  });

  useEffect(() => {
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
