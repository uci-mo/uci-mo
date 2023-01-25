import React from "react";

type Theme = "dark" | "light";
export const themeKey = "using-vanilla-extract-pref";

interface ThemeContextValues {
  theme: Theme | null;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = React.createContext<ThemeContextValues>({
  theme: null,
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<Theme | null>(null);

  React.useEffect(() => {
    setTheme(
      document.documentElement.classList.contains("dark") ? "dark" : "light"
    );
  }, []);

  const setter = (theme: Theme) => {
    setTheme(theme);

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);

    try {
      localStorage.setItem(themeKey, theme);
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

// local storage use?

// export const ThemeToggle = () => {
//   const { theme, setTheme } = React.useContext(ThemeContext);
//   const mode = theme === "light" ? "dark" : "light";

//   return (
//     <button className={""} onClick={() => setTheme(mode)}>
//       Set {mode} mode
//     </button>
//   );
// };
