import { ReactNode } from "react";
import TodosProvider from "./TodosContext";
import SettingsProvider from "./SettingsContext";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SettingsProvider>
      <TodosProvider>{children}</TodosProvider>
    </SettingsProvider>
  );
};

export default Providers;
