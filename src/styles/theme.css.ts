import {
  createGlobalTheme,
  createTheme,
  createThemeContract,
  globalStyle,
} from "@vanilla-extract/css";
import { colors, proportionalSizes } from "./constants";

const root = createGlobalTheme(":root", {
  colors,
  ...proportionalSizes,
});

const theme = createThemeContract({
  primary: null,
  secondary: null,
  background: null,
  text: {
    normal: null,
    dimmed: null,
    link: null,
    linkHover: null,
  },
});

export const lightTheme = createTheme(theme, {
  primary: colors.blue700,
  secondary: colors.yellow600,
  background: colors.white,
  text: {
    normal: colors.black,
    dimmed: colors.gray900,
    link: colors.blue500,
    linkHover: colors.blue700,
  },
});

export const darkTheme = createTheme(theme, {
  primary: colors.blue400,
  secondary: colors.yellow500,
  background: colors.black,
  text: {
    normal: colors.white,
    dimmed: colors.gray400,
    link: colors.blue500,
    linkHover: colors.blue300,
  },
});

export const ve = { ...root, theme };
