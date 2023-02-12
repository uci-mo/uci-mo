import React, { createContext, ReactNode, useEffect, useState } from "react";
import { lightTheme, darkTheme } from "../styles/theme.css";

export const themes = ["light", "dark"] as const;
type Theme = typeof themes[number];
const themesMap: { [key in Theme]: string } = {
  light: lightTheme,
  dark: darkTheme,
};
const defaultTheme = themes[0];
const themeLSKey = "THEME";

function getStoredTheme() {
  const storedTheme = localStorage.getItem(themeLSKey);
  return storedTheme === themes[1] ? themes[1] : defaultTheme;
}

interface ThemeContextValues {
  theme: Theme | null;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextValues>({
  theme: null,
  setTheme: () => {},
});

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme | null>(getStoredTheme());

  useEffect(() => {
    const storedTheme = getStoredTheme();
    setTheme(storedTheme);
    document.documentElement.classList.add(themesMap[storedTheme]);
  }, []);

  const setter = (theme: Theme) => {
    setTheme(theme);

    document.documentElement.classList.remove(
      ...themes.map((t) => themesMap[t])
    );
    document.documentElement.classList.add(themesMap[theme]);

    try {
      localStorage.setItem(themeLSKey, theme);
    } catch (e) {}
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: setter,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
