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
  loading: boolean;
};

const TodosContext = createContext<ContextValues>({
  todos: null,
  loading: true,
});

export const GetTodos = () => useContext(TodosContext);

const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[] | null>(null);

  const vscode = getVSCodeApi();

  useMessage({
    [POST_COMMANDS.UPDATE_TODO](data) {
      setTodos(data);
      setLoading(false);
    },
  });

  useEffect(() => {
    vscode.postMessage({
      command: POST_COMMANDS.LOADED,
    });
  }, []);

  const contextValues: ContextValues = { todos: todos, loading };
  return (
    <TodosContext.Provider value={contextValues}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodosProvider;
