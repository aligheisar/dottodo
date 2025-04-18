import type { Todo } from "../../types";
import TodosHeader from "./TodosHeader";
import TodoC from "./Todo";
import Loading from "./Loading";

const TodoContainer = ({
  todos,
  loading,
}: {
  todos: Todo[];
  loading: boolean;
}) => {
  return (
    <section className="col-md">
      <TodosHeader />
      {loading ? (
        <Loading />
      ) : todos.length > 0 ? (
        <ul>
          {todos.map((i) => (
            <TodoC data={i} key={i.id} />
          ))}
        </ul>
      ) : (
        <p className="text-center">no item to show</p>
      )}
    </section>
  );
};

export default TodoContainer;
