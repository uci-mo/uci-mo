import { ve } from '../../../styles/theme.css';
import { headerHeight } from './constants';
import { style } from '@vanilla-extract/css';

export const headerWrap = style([
  {
    zIndex: 2,
    position: 'sticky',
    top: 0
  }
]);

export const header = style([
  {
    height: headerHeight,
    borderBottom: `1px solid ${ve.theme.text.dimmed}`,
    zIndex: 2,
    position: 'absolute',
    top: 0,
    width: '100%',
    backdropFilter: 'blur(20px)'
  }
]);

export const nav = style([
  {
    display: 'flex',
    justifyContent: 'space-between',
    height: '100%'
  }
]);

export const navLinksList = style([
  {
    padding: 0,
    margin: 0,
    listStyle: 'none',
    display: 'flex',
    alignItems: 'center'
  }
]);

export const navLink = style([
  {
    display: 'block',
    padding: ve.space[2],
    margin: 0
  }
]);

export const navLinkActive = style([
  {
    textDecoration: 'underline'
  }
]);
