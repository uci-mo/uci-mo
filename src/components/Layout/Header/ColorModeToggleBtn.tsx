import React, { useContext } from "react";
import { ColorModeContext } from "../../../providers/ColorModeProvider";

export default function ColorModeBtn() {
  const { colorMode, setColorMode } = useContext(ColorModeContext);
  return (
    <button
      onClick={() => setColorMode(colorMode === "dark" ? "light" : "dark")}
    >
      {colorMode}
    </button>
  );
}
