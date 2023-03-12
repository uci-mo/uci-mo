export const breakpointKeys = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;
export type BreakpointKey = (typeof breakpointKeys)[number];
export const breakpoints: Record<
  BreakpointKey,
  { screen: number; el: number | string }
> = {
  xs: { screen: 0, el: 0 },
  // min screen width, max element width
  sm: { screen: 576, el: 540 },
  md: { screen: 768, el: 720 },
  lg: { screen: 992, el: 960 },
  xl: { screen: 1200, el: 1140 },
  xxl: { screen: 1400, el: 1320 }
} as const;

export const colors = {
  transparent: 'transparent',
  current: 'currentColor',
  white: '#f2f2ec',
  black: '#242424',
  // pure
  pureWhite: '#fff',
  pureBlack: '#000',
  // gray
  gray50: '#f8f8f8',
  gray100: '#f0f0f0',
  gray200: '#e4e4e4',
  gray300: '#d1d1d1',
  gray400: '#b4b4b4',
  gray500: '#9a9a9a',
  gray600: '#818181',
  gray700: '#6a6a6a',
  gray800: '#5a5a5a',
  gray900: '#4e4e4e',
  // red
  red50: '#fff6ec',
  red100: '#ffead2',
  red200: '#ffd1a4',
  red300: '#ffb06a',
  red400: '#ff832f',
  red500: '#ff5f06',
  red600: '#fa4200',
  red700: '#cf2e00',
  red800: '#9c2308',
  red900: '#83210b',
  // yellow
  yellow50: '#f9f9d7',
  yellow100: '#ffffbf',
  yellow200: '#fffd8a',
  yellow300: '#fff85d',
  yellow400: '#ffed3d',
  yellow500: '#ffdb2e',
  yellow600: '#e1ad2d',
  yellow700: '#b87e34',
  yellow800: '#855537',
  yellow900: '#4d332d',
  // green
  green50: '#effbea',
  green100: '#dcf5d2',
  green200: '#baecaa',
  green300: '#90dd79',
  green400: '#6bcc4f',
  green500: '#4ab230',
  green600: '#328220',
  green700: '#2c6c1f',
  green800: '#27561e',
  green900: '#234a1d',
  // blue
  blue50: '#eef9ff',
  blue100: '#d9f0ff',
  blue200: '#bbe5ff',
  blue300: '#8cd6ff',
  blue400: '#56bdff',
  blue500: '#2e9eff',
  blue600: '#187ff8',
  blue700: '#1068e5',
  blue800: '#165bca',
  blue900: '#174891'
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
};

export const proportionalSizes = {
  space: {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '16px',
    4: '32px',
    5: '64px',
    6: '128px'
  },
  // https://vanilla-extract.style/documentation/global-api/global-font-face/
  fonts: {
    heading: 'Georgia, Times, Times New Roman, serif',
    body: 'system-ui',
    code: ''
  },
  fontSize: {
    1: '12px',
    2: '16px',
    3: '20px',
    4: '36px',
    5: '52px',
    6: '72px'
  },
  lineHeight: {
    small: '24px',
    medium: '28px',
    large: '40px'
  },
  boxShadow: {
    sm: `0 1px 2px 0 rgb(0 0 0 / 0.05)`,
    md: `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`,
    lg: `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`
  },
  radii: {
    sm: `3px`,
    md: `7px`,
    full: `100%`
  }
};
