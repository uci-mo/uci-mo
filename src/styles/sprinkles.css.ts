import {
  createSprinkles,
  defineProperties,
  createMapValueFn,
} from "@vanilla-extract/sprinkles";
import { BreakpointKey, breakpointKeys, breakpoints } from "./constants";
import { ve } from "./theme.css";

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
    display: ["none", "flex"],
    flexDirection: ["row", "column"],
    alignItems: ["stretch", "flex-start", "center", "flex-end"],
    justifyContent: ["stretch", "flex-start", "center", "flex-end"],
    gap: ve.space,
    paddingTop: ve.space,
    paddingBottom: ve.space,
    paddingLeft: ve.space,
    paddingRight: ve.space,
    marginTop: ve.space,
    marginBottom: ve.space,
    marginLeft: ve.space,
    marginRight: ve.space,
    // borderRadius: ve.borderRadius,
    // fontFamily: ve.fonts.body,
    fontSize: ve.fontSize,
    lineHeight: ve.lineHeight,
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

const colorModeProperties = defineProperties({
  conditions: {
    lightMode: {
      //  "@media": "(prefers-color-scheme: light)"
    },
    darkMode: { "@media": "(prefers-color-scheme: dark)" },
  },
  defaultCondition: "lightMode",
  properties: {
    color: ve.colors,
    background: ve.colors,
  },
});

export const sprinkles = createSprinkles(
  responsiveProperties,
  colorModeProperties
);

export const mapResponsiveValue = createMapValueFn(responsiveProperties);
