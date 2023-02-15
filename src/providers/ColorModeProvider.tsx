import React, { createContext, ReactNode, useEffect, useState } from "react";
import { lightTheme, darkTheme } from "../styles/theme.css";

export const colorModes = ["light", "dark"] as const;
type ColorMode = typeof colorModes[number];
const colorModesMap: { [key in ColorMode]: string } = {
  light: lightTheme,
  dark: darkTheme,
};
const defaultColorMode = colorModes[0];
const colorModeLSKey = "COLOR_MODE";

function getStoredColorMode() {
  const storedColorMode = localStorage.getItem(colorModeLSKey);
  return storedColorMode === colorModes[1] ? colorModes[1] : defaultColorMode;
}

interface ColorModeContextValues {
  colorMode: ColorMode | null;
  setColorMode: (colorMode: ColorMode) => void;
}

export const ColorModeContext = createContext<ColorModeContextValues>({
  colorMode: null,
  setColorMode: () => {},
});

export default function ColorModeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [colorMode, setColorMode] = useState<ColorMode | null>(
    getStoredColorMode()
  );

  useEffect(() => {
    const storedColorMode = getStoredColorMode();
    setColorMode(storedColorMode);
    document.documentElement.classList.add(colorModesMap[storedColorMode]);
  }, []);

  const setter = (colorMode: ColorMode) => {
    setColorMode(colorMode);

    document.documentElement.classList.remove(
      ...colorModes.map((t) => colorModesMap[t])
    );
    document.documentElement.classList.add(colorModesMap[colorMode]);

    try {
      localStorage.setItem(colorModeLSKey, colorMode);
    } catch (e) {}
  };

  return (
    <ColorModeContext.Provider
      value={{
        colorMode,
        setColorMode: setter,
      }}
    >
      {children}
    </ColorModeContext.Provider>
  );
}
