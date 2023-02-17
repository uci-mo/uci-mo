import {
  createSprinkles,
  defineProperties,
  createMapValueFn,
} from "@vanilla-extract/sprinkles";
import { ve } from "./theme.css";

const breakpointKeys = ["xs", "sm", "md", "lg", "xl", "xxl"] as const;
type BreakpointKey = typeof breakpointKeys[number];
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
  xxl: { screen: 1400, el: 1320 },
} as const;

export const conditions = breakpointKeys.reduce(
  (acc, breakpointKey, bi) => ({
    ...acc,
    [breakpointKey]:
      bi === 0
        ? {}
        : {
            "@media": `screen and (min-width: ${breakpoints[breakpointKey].screen}px)`,
          },
  }),
  {}
) as Record<BreakpointKey, Record<"@media", string>>;

const responsiveProperties = defineProperties({
  conditions,
  defaultCondition: breakpointKeys[0],
  responsiveArray: breakpointKeys,
  properties: {
    fontSize: ve.fontSize,
    lineHeight: ve.lineHeight,
    paddingTop: ve.space,
    paddingBottom: ve.space,
    paddingLeft: ve.space,
    paddingRight: ve.space,
    marginTop: ve.space,
    marginBottom: ve.space,
    marginLeft: ve.space,
    marginRight: ve.space,
  },
  shorthands: {
    text: ["fontSize", "lineHeight"],
    p: ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"],
    px: ["paddingLeft", "paddingRight"],
    py: ["paddingTop", "paddingBottom"],
    m: ["marginTop", "marginBottom", "marginLeft", "marginRight"],
    mx: ["marginLeft", "marginRight"],
    my: ["marginTop", "marginBottom"],
  },
});
export const sprinkles = createSprinkles(responsiveProperties);

export const mapResponsiveValue = createMapValueFn(responsiveProperties);
