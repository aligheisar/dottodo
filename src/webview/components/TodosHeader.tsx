import { GetTodos } from "../context/TodosContext";
import SpanButton from "./ui/SpanButton";

const TodosHeader = () => {
  const { refreshTodos } = GetTodos();

  return (
    <div className="row-between inline-padding">
      <h1>Todos</h1>
      <SpanButton codiconName="refresh" func={refreshTodos} />
    </div>
  );
};

export default TodosHeader;
