import { colors, proportionalSizes } from './constants.css';
import {
  createGlobalTheme,
  createTheme,
  createThemeContract
} from '@vanilla-extract/css';

const rootVars = createGlobalTheme(':root', {
  colors,
  ...proportionalSizes
});

const theme = createThemeContract({
  primary: '',
  secondary: '',
  background: '',
  text: {
    normal: '',
    dimmed: '',
    link: '',
    linkHover: ''
  }
});

export const lightColorMode = createTheme(theme, {
  primary: colors.blue700,
  secondary: colors.yellow600,
  background: colors.white,
  text: {
    normal: colors.black,
    dimmed: colors.gray900,
    link: colors.blue500,
    linkHover: colors.blue700
  }
});

export const darkColorMode = createTheme(theme, {
  primary: colors.blue400,
  secondary: colors.yellow500,
  background: colors.black,
  text: {
    normal: colors.white,
    dimmed: colors.gray400,
    link: colors.blue500,
    linkHover: colors.blue300
  }
});

export const ve = { ...rootVars, theme };
