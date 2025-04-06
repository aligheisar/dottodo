import { GetTodos } from "../context/TodosContext";
import SpanButton from "./ui/SpanButton";

const TodosHeader = () => {
  const { refreshTodos } = GetTodos();

  return (
    <div className="row-between">
      <h1>Todos</h1>
      <SpanButton codiconName="refresh" onClick={refreshTodos} />
    </div>
  );
};

export default TodosHeader;
