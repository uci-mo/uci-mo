import { breakpoints } from '../../../styles/constants.css';
import { ve } from '../../../styles/theme.css';
import { style } from '@vanilla-extract/css';

const responsiveMedia: Record<
  `screen and (min-width: ${number}px)`,
  {
    maxWidth: `${number}px`;
  }
> = Object.values(breakpoints).reduce(
  (acc, cur) =>
    cur.screen === 0
      ? acc
      : {
          ...acc,
          [`screen and (min-width: ${cur.screen}px)`]: {
            maxWidth: `${cur.el}px`
          }
        },
  {}
);

export const container = style([
  {
    'marginLeft': 'auto',
    'marginRight': 'auto',
    'maxWidth': '100%',
    'paddingLeft': ve.space[3],
    'paddingRight': ve.space[3],

    '@media': responsiveMedia
  }
]);
