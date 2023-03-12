import React, { createContext, ReactNode, useCallback, useState } from 'react';
import { darkColorMode, lightColorMode } from '../../styles/theme.css';

export const colorModes = ['light', 'dark'] as const;
type ColorMode = (typeof colorModes)[number];
const colorModesMap: { [key in ColorMode]: string } = {
  light: lightColorMode,
  dark: darkColorMode
};
const defaultColorMode = colorModes[0];
const colorModeLSKey = 'COLOR_MODE';

function getInitialColorMode(): ColorMode {
  let usedColorMode: ColorMode = defaultColorMode;
  const storedColorMode = localStorage.getItem(colorModeLSKey);
  const prefersDarkMode =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (
    storedColorMode &&
    typeof storedColorMode === 'string' &&
    (colorModes as readonly string[]).includes(storedColorMode)
  ) {
    usedColorMode = storedColorMode as ColorMode;
  } else if (prefersDarkMode) {
    usedColorMode = colorModes[1];
  }

  document.documentElement.classList.add(colorModesMap[usedColorMode]);

  return usedColorMode;
}

interface ColorModeContextValues {
  colorMode: ColorMode | null;
  setColorMode: (colorMode: ColorMode) => void;
}

export const ColorModeContext = createContext<ColorModeContextValues>({
  colorMode: null,
  setColorMode: () => {}
});

export default function ColorModeProvider({
  children
}: {
  children: ReactNode;
}) {
  const [colorMode, setColorMode] = useState<ColorMode>(getInitialColorMode());

  const setter = useCallback((colorMode: ColorMode) => {
    document.documentElement.classList.remove(
      ...colorModes.map((t) => colorModesMap[t])
    );
    document.documentElement.classList.add(colorModesMap[colorMode]);
    document.documentElement.setAttribute(
      'style',
      `color-scheme: ${colorMode}`
    );
    setColorMode(colorMode);
    try {
      localStorage.setItem(colorModeLSKey, colorMode);
    } catch (e) {}
  }, []);

  return (
    <ColorModeContext.Provider
      value={{
        colorMode,
        setColorMode: setter
      }}
    >
      {children}
    </ColorModeContext.Provider>
  );
}
