import type { Todo } from "../../types";
import TodosHeader from "./TodosHeader";

const TodoContainer = ({
  todos,
  loading,
}: {
  todos: Todo[];
  loading: boolean;
}) => {
  return (
    <section>
      <TodosHeader />
      {loading ? (
        <p>loading...</p>
      ) : (
        <ul>
          {todos.length > 0 ? (
            todos.map((i) => (
              <p style={i.done ? { color: "red" } : {}} key={i.id}>
                {i.task}
              </p>
            ))
          ) : (
            <p>no item to show</p>
          )}
        </ul>
      )}
    </section>
  );
};

export default TodoContainer;
