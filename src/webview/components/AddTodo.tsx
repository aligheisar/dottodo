import { FormEvent, useRef } from "react";
import { Priority } from "../../types";
import { addTodoMessage } from "../utils/postMessages";

const AddTodo = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const selectRef = useRef<HTMLSelectElement | null>(null);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputRef.current || !selectRef.current) return;

    addTodoMessage(inputRef.current.value, selectRef.current.value as Priority);

    selectRef.current.value = "medium";

    inputRef.current.value = "";
    inputRef.current.focus();
  };

  return (
    <form className="inline-padding" onSubmit={handleFormSubmit}>
      <input autoFocus ref={inputRef} type="text" placeholder="Enter Todo" />
      <select ref={selectRef} defaultValue="medium">
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <button type="submit">
        Add <span className="codicon codicon-add"></span>
      </button>
    </form>
  );
};

export default AddTodo;
