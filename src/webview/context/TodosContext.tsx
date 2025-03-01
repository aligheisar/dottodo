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

export type ContextValues = {
  todos: Todo[] | null;
};

const TodosContext = createContext<ContextValues>({ todos: null });

export const GetTodos = () => useContext(TodosContext);

const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState(null);

  const vscode = getVSCodeApi();

  useEffect(() => {
    console.log("use Effect is running");

    window.addEventListener("message", (e) => {
      setTodos(e.data.todos);
    });

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
