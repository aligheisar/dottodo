import AddTodo from "./components/AddTodo";
import { GetTodos } from "./context/TodosContext";
import { initMessage } from "./utils/messages";

const App = () => {
  const { loading, todos } = GetTodos();

  if (loading) return <p>loading</p>;

  return todos ? (
    <>
      <AddTodo />
      <ul>
        <>
          <h1>todos</h1>
          {todos.length > 0 ? (
            todos.map((i) => (
              <p style={i.done ? { color: "red" } : {}} key={i.id}>
                {i.task}
              </p>
            ))
          ) : (
            <p>no item to show</p>
          )}
        </>
      </ul>
    </>
  ) : (
    <button onClick={initMessage}>Init dotTODO</button>
  );
};

export default App;
