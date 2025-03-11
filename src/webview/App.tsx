import { GetTodos } from "./context/TodosContext";
import { initMessage } from "./utils/messages";

const App = () => {
  const { todos } = GetTodos();

  return (
    <ul>
      {todos ? (
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
      ) : (
        <button onClick={initMessage}>Init dotTODO</button>
      )}
    </ul>
  );
};

export default App;
