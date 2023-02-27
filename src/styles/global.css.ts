import { darkColorMode, lightColorMode, ve } from './theme.css';
import { globalStyle } from '@vanilla-extract/css';

globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box'
});

globalStyle('html', {
  overflowY: 'scroll',
  height: '100%',
  textRendering: 'optimizeLegibility',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  fontSize: '16px',
  // lineHeight: 1.5,
  // fontSize: "100%",
  WebkitFontSmoothing: 'antialiased',
  colorScheme: 'light'
});
globalStyle(`html.${lightColorMode}`, {
  colorScheme: 'light'
});
globalStyle(`html.${darkColorMode}`, {
  colorScheme: 'dark'
});

globalStyle('body', {
  margin: 0,
  height: '100%',
  isolation: 'isolate',
  // padding: ve.space.small,
  fontFamily: ve.fonts.body,
  background: ve.theme.background,
  color: ve.theme.text.normal,
  transition: 'background-color 200ms, color 100ms',
  display: 'flex',
  flexDirection: 'column'
});

globalStyle('#___gatsby, #___gatsby #gatsby-focus-wrapper', {
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1
});

globalStyle('img, picture, video, canvas, svg', {
  display: 'block',
  maxWidth: '100%'
});

globalStyle('input, button, textare, select', {
  font: 'inherit'
});

globalStyle('p, h1, h2, h3, h4, h5, h6', {
  overflowWrap: 'break-word'
});

globalStyle('a', {
  color: ve.theme.text.link,
  textDecoration: 'none',
  transition: 'color 100ms'
});
globalStyle('a:hover', {
  color: ve.theme.text.linkHover,
  textDecoration: 'underline'
});
