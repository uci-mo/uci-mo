import { globalStyle } from "@vanilla-extract/css";
import { themeVars } from "./theme.css";

globalStyle(`"*, *::before, *::after"`, {
  boxSizing: `border-box`,
});

globalStyle(`html`, {
  overflowY: "scroll",
});

globalStyle(`html, body`, {
  margin: 0,
  height: "100%",
  fontSize: `100%`,
  fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  lineHeight: 1.5,
  WebkitFontSmoothing: `antialiased`,
});

globalStyle("#___gatsby", {
  isolation: `isolate`,
  // padding: themeVars.space.small,
  fontFamily: themeVars.fonts.body,
  background: themeVars.colors.background,
  color: themeVars.colors.text.normal,
  display: "flex",
  flexDirection: "column",
  minHeight: "100%",
});

globalStyle("#___gatsby #gatsby-focus-wrapper", {
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
});

globalStyle(`img, picture, video, canvas, svg`, {
  display: `block`,
  maxWidth: `100%`,
});

globalStyle(`input, button, textare, select`, {
  font: `inherit`,
});

globalStyle(`p, h1, h2, h3, h4, h5, h6`, {
  overflowWrap: `break-word`,
});
