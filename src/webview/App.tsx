import { GetTodos } from "./context/TodosContext";
import AddTodo from "./components/AddTodo";
import TodoContainer from "./components/TodoContainer";
import NotInit from "./components/NotInit";
import Loading from "./components/Loading";

const App = () => {
  const { loading, todos } = GetTodos();

  if (loading && !todos) return <Loading />;

  return todos ? (
    <>
      <AddTodo />
      <TodoContainer loading={loading} todos={todos} />
    </>
  ) : (
    <NotInit />
  );
};

export default App;
