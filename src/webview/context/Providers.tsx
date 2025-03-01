import { ReactNode } from "react";
import TodosProvider from "./TodosContext";

const Providers = ({ children }: { children: ReactNode }) => {
  return <TodosProvider>{children}</TodosProvider>;
};

export default Providers;
