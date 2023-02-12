import { globalStyle } from "@vanilla-extract/css";
import { themeVars } from "./theme.css";

globalStyle("#___gatsby", {
  isolation: `isolate`,
  padding: themeVars.space.small,
  fontFamily: themeVars.fonts.body,
  background: themeVars.colors.background,
  color: themeVars.colors.text.normal,
  // minHeight: "100vh",
});

globalStyle(`*`, {
  boxSizing: `border-box`,
  margin: 0,
});
globalStyle(`html`, {
  overflowY: "scroll",
});

globalStyle(`html, body`, {
  height: `100%`,
  fontSize: `18px`,
  fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
});

globalStyle(`body`, {
  lineHeight: 1.5,
  WebkitFontSmoothing: `antialiased`,
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
