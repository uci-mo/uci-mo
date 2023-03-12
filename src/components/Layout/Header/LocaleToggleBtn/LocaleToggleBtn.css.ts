import { ve } from '../../../../styles/theme.css';
import { style } from '@vanilla-extract/css';

export const btn = style([
  {
    borderBottom: `1px solid ${ve.theme.text.dimmed}`
  }
]);

export const langBtnsList = style([
  {
    padding: 0,
    margin: 0,
    listStyle: 'none',
    display: 'flex',
    alignItems: 'center'
  }
]);

export const langBtn = style([
  {
    display: 'block',
    padding: ve.space[2],
    margin: 0
  }
]);

export const langBtnActive = style([
  {
    textDecoration: 'underline',
    pointerEvents: 'none'
  }
]);
