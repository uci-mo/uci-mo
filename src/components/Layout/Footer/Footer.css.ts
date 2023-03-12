import { breakpoints } from '../../../styles/constants.css';
import { sprinkles } from '../../../styles/sprinkles.css';
import { ve } from '../../../styles/theme.css';
import { style } from '@vanilla-extract/css';

export const footer = style([
  {
    borderTop: `1px solid ${ve.theme.text.dimmed}`
  }
]);

export const footerP = style([
  sprinkles({
    py: 3,
    m: 0
  })
]);
