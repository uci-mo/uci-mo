import React, { useContext } from "react";
import { ColorModeContext } from "./ColorModeProvider";

export default function ColorModeToggleBtn() {
  const { colorMode, setColorMode } = useContext(ColorModeContext);
  return (
    <button
      onClick={() => setColorMode(colorMode === "dark" ? "light" : "dark")}
      aria-label={`${colorMode} mode`}
    >
      {colorMode}
    </button>
  );
}
