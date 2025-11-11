// /src/context/SettingsContext.tsx
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

// Centralized theme registry
export const THEMES = [
  "default",
  "ms95",
  "xp",
  "dos",
  "system7",
  "modern",
] as const;
export type Theme = typeof THEMES[number];

type Settings = { theme: Theme };

interface SettingsContextType {
  settings: Settings;
  setTheme: (theme: Theme) => void;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<Settings>({ theme: "default" });

  const setTheme = (theme: Theme) => {
    setSettings((prev) => ({ ...prev, theme }));
  };

  useEffect(() => {
    const body = document.body;
    // Remove any previous theme classes before adding the new one
    body.classList.forEach((cls) => {
      if (cls.startsWith("theme-")) body.classList.remove(cls);
    });
    body.classList.add(`theme-${settings.theme}`);
  }, [settings.theme]);

  return (
    <SettingsContext.Provider value={{ settings, setTheme }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettingsContext must be used within SettingsProvider");
  return ctx;
};
