import React, { useContext } from "react";
import { ThemeContext } from "../ThemeProvider";

export default function ThemeBtn() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme}
    </button>
  );
}
