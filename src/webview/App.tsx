import { GetTodos } from "./context/TodosContext";
import { getVSCodeApi } from "./VsCodeApi";

const vscode = getVSCodeApi();

const App = () => {
  const { todos } = GetTodos();

  const initMessage = () => {
    vscode.postMessage({
      command: "init",
    });
  };

  return (
    <ul>
      {todos ? (
        <>
          <h1>todos</h1>
          {todos.length > 0 &&
            todos.map((i) => (
              <p style={i.done ? { color: "red" } : {}} key={i.id}>
                {i.task}
              </p>
            ))}
        </>
      ) : (
        <button onClick={initMessage}>Init dotTODO</button>
      )}
    </ul>
  );
};

export default App;
