import { createContext, useContext, ReactNode, useState } from "react";
import { Settings } from "../../types";
import { DEFAULT_SETTINGS } from "../../constants/defaults";

type ContextValues = {
  settings: Settings;
};

const SettingsContext = createContext<ContextValues>({
  settings: DEFAULT_SETTINGS,
});

export const GetSettings = () => useContext(SettingsContext);

const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  const contextValues: ContextValues = {
    settings,
  };
  return (
    <SettingsContext.Provider value={contextValues}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
