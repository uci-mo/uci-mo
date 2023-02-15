import {
  createGlobalTheme,
  createTheme,
  createThemeContract,
} from "@vanilla-extract/css";
import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";

const colors = {
  transparent: "transparent",
  current: "currentColor",
  white: "#f2f2ec",
  black: "#242424",
  pure: {
    white: "#fff",
    black: "#000",
  },
  grey: {
    50: "#f8f8f8",
    100: "#f0f0f0",
    200: "#e4e4e4",
    300: "#d1d1d1",
    400: "#b4b4b4",
    500: "#9a9a9a",
    600: "#818181",
    700: "#6a6a6a",
    800: "#5a5a5a",
    900: "#4e4e4e",
  },
  red: {
    50: "#fff6ec",
    100: "#ffead2",
    200: "#ffd1a4",
    300: "#ffb06a",
    400: "#ff832f",
    500: "#ff5f06",
    600: "#fa4200",
    700: "#cf2e00",
    800: "#9c2308",
    900: "#83210b",
  },
  yellow: {
    50: "#f9f9d7",
    100: "#ffffbf",
    200: "#fffd8a",
    300: "#fff85d",
    400: "#ffed3d",
    500: "#ffdb2e",
    600: "#e1ad2d",
    700: "#b87e34",
    800: "#855537",
    900: "#4d332d",
  },
  green: {
    50: "#effbea",
    100: "#dcf5d2",
    200: "#baecaa",
    300: "#90dd79",
    400: "#6bcc4f",
    500: "#4ab230",
    600: "#328220",
    700: "#2c6c1f",
    800: "#27561e",
    900: "#234a1d",
  },
  blue: {
    50: "#eef9ff",
    100: "#d9f0ff",
    200: "#bbe5ff",
    300: "#8cd6ff",
    400: "#56bdff",
    500: "#2e9eff",
    600: "#187ff8",
    700: "#1068e5",
    800: "#165bca",
    900: "#174891",
  },
  //-------------------
  // '50': '#f3f6fc',
  // '100': '#e5ecf9',
  // '200': '#c6d7f1',
  // '300': '#94b7e5',
  // '400': '#5b90d5',
  // '500': '#3673c1',
  // '600': '#2659a3',
  // '700': '#204884',
  // '800': '#1e3e6e',
  // '900': '#1e355c',
  //-------------------
  // '50': '#f6faf5',
  // '100': '#f2f3e7',
  // '200': '#e3d8cf',
  // '300': '#cda8b0',
  // '400': '#ae7aa8',
  // '500': '#71568f',
  // '600': '#40496d',
  // '700': '#37575c',
  // '800': '#304b3d',
  // '900': '#2d3d29',
  //-------------------
  // "50": "#f1fafa",
  // "100": "#dbf0f2",
  // "200": "#bbe1e6",
  // "300": "#8dcbd3",
  // "400": "#56adba",
  // "500": "#3b919f",
  // "600": "#347686",
  // "700": "#2f616f",
  // "800": "#2e515c",
  // "900": "#2a454f",
  //-------------------
  // '50': '#fbfaf3',
  // '100': '#d3d9f3',
  // '200': '#e8dba6',
  // '300': '#6f7dd8',
  // '400': '#c3b046',
  // '500': '#262ea6',
  // '600': '#88851b',
  // '700': '#1f186d',
  // '800': '#535a16',
  // '900': '#25164b',
};

const root = createGlobalTheme("#___gatsby", {
  colors,
  space: {
    small: "4px",
    medium: "8px",
    large: "16px",
  },
  fonts: {
    heading: "Georgia, Times, Times New Roman, serif",
    body: "system-ui",
    code: "",
  },
  fontSizes: {
    small: "16px",
    medium: "20px",
    large: "36px",
  },
  lineHeights: {
    small: "24px",
    medium: "28px",
    large: "40px",
  },
  fontSize: {
    xs: ``,
    sm: ``,
    md: ``,
    lg: ``,
    xl: ``,
  },
  // space: {
  //   xs: ``,
  //   sm: ``,
  //   md: ``,
  //   lg: ``,
  //   xl: ``,
  // },
  boxShadow: {
    sm: `0 1px 2px 0 rgb(0 0 0 / 0.05)`,
    md: `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`,
    lg: `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`,
  },
  radii: {
    sm: `3px`,
    md: `7px`,
    full: `100%`,
  },
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
  primary: colors.blue[700],
  secondary: colors.yellow[600],
  background: colors.white,
  text: {
    normal: colors.black,
    dimmed: colors.grey[900],
    link: colors.blue[500],
    linkHover: colors.blue[700],
  },
});

export const darkTheme = createTheme(theme, {
  primary: colors.blue[400],
  secondary: colors.yellow[500],
  background: colors.black,
  text: {
    normal: colors.white,
    dimmed: colors.grey[400],
    link: colors.blue[500],
    linkHover: colors.blue[300],
  },
});

export const ve = { ...root, theme };
