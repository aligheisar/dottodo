import { FormEvent, useRef } from "react";

const AddTodo = () => {
  const input = useRef<HTMLInputElement | null>(null);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.current) return;

    input.current.value = "";
    input.current.focus();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input autoFocus ref={input} type="text" placeholder="Enter Todo" />
      <button type="submit">
        Add <span className="codicon codicon-add"></span>
      </button>
    </form>
  );
};

export default AddTodo;
