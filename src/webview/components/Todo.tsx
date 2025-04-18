import { Todo } from "../../types";
import { GetTodos } from "../context/TodosContext";
import SpanButton from "./ui/SpanButton";

const Todo = ({ data }: { data: Todo }) => {
  const { deleteTodo, editTodo } = GetTodos();

  return (
    <div tabIndex={0} className="todo row-between inline-padding">
      <span>{data.task}</span>
      <div className="row-sm">
        <SpanButton func={() => editTodo(data.id)} codiconName="edit" />
        <SpanButton func={() => deleteTodo(data.id)} codiconName="trash" />
      </div>
    </div>
  );
};

export default Todo;
