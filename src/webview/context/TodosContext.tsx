import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { Todo } from "../../types";
import { POST_COMMANDS } from "../../constants/commands";
import { useMessage } from "../hooks/use-message";
import { loadedMessage, updateTodosListMessage } from "../utils/postMessages";

export type ContextValues = {
  todos: Todo[] | null;
  loading: boolean;
  refreshTodos: () => void;
};

const TodosContext = createContext<ContextValues | null>(null);

export const GetTodos = () => {
  const context = useContext(TodosContext);

  if (!context) throw new Error("you should use context in it provider");

  return context;
};

const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[] | null>(null);

  useMessage({
    [POST_COMMANDS.UPDATE_TODO_LIST](data) {
      setTodos(data);
      setLoading(false);
    },
  });

  useEffect(() => {
    loadedMessage();
  }, []);

  const refreshTodos = () => {
    setLoading(true);

    updateTodosListMessage();
  };

  const contextValues: ContextValues = { todos: todos, loading, refreshTodos };
  return (
    <TodosContext.Provider value={contextValues}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodosProvider;
