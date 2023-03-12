import { headerHeight } from '../Header';
import { pageTransitionDuration } from './constants';
import { style } from '@vanilla-extract/css';

export const mainOuterWrap = style([
  {
    flexGrow: 1,
    marginTop: headerHeight
  }
]);

export const mainInnerWrap = style([
  {
    overflowY: 'hidden',
    transition: `height ${pageTransitionDuration}ms`
  }
]);

const mainGridArea = 'main';
export const mainHtml = style([
  {
    overflow: 'hidden',
    display: 'grid',
    gridTemplate: `"${mainGridArea}"`
  }
]);
export const mainContent = style([
  {
    gridArea: mainGridArea
  }
]);

// not in use??
