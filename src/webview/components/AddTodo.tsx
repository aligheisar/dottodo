import { useRef } from "react";

const AddTodo = () => {
  const input = useRef<HTMLInputElement>(null);

  const AddTodo = () => {
    console.log(input.current?.value);
  };

  return (
    <section>
      <input ref={input} type="text" placeholder="Enter Todo" />
      <button onClick={AddTodo}>
        Add <span className="codicon codicon-add"></span>
      </button>
    </section>
  );
};

export default AddTodo;
