import {
  createGlobalTheme,
  createTheme,
  createThemeContract,
} from "@vanilla-extract/css";
import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";

const root = createGlobalTheme("#___gatsby", {
  space: {
    small: "4px",
    medium: "8px",
    large: "16px",
  },
  fonts: {
    heading: "Georgia, Times, Times New Roman, serif",
    body: "system-ui",
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
});

const colors = createThemeContract({
  primary: null,
  secondary: null,
  background: null,
  text: {
    normal: null,
    dimmed: null,
  },
});

export const lightTheme = createTheme(colors, {
  primary: "#1E40AF",
  secondary: "#DB2777",
  background: "#f9fafb",
  text: {
    normal: "#1F2937",
    dimmed: "#6B7280",
  },
});

export const darkTheme = createTheme(colors, {
  primary: "#60A5FA",
  secondary: "#F472B6",
  background: "#1F2937",
  text: {
    normal: "#F9FAFB",
    dimmed: "#D1D5DB",
  },
});

const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: { "@media": "screen and (min-width: 768px)" },
    desktop: { "@media": "screen and (min-width: 1024px)" },
  },
  defaultCondition: "mobile",
  properties: {
    fontSize: root.fontSizes,
    lineHeight: root.lineHeights,
  },
  shorthands: {
    text: ["fontSize", "lineHeight"],
  },
});
export const sprinkles = createSprinkles(responsiveProperties);

export const themeVars = { ...root, colors };
