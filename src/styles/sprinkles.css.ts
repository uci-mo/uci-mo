import {
  createSprinkles,
  defineProperties,
  createMapValueFn,
} from "@vanilla-extract/sprinkles";
import { BreakpointKey, breakpointKeys, breakpoints } from "./constants.css";
import { darkColorMode, lightColorMode, ve } from "./theme.css";

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

// const borderWidth = createVar();

const responsiveProperties = defineProperties({
  conditions,
  defaultCondition: breakpointKeys[0],
  responsiveArray: breakpointKeys,
  properties: {
    display: ["none", "block", "flex"],
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
    width: ["100vw", "100%"],
    height: ["100vh", "100%"],
    // borderRadius: ve.borderRadius,
    // fontFamily: ve.fonts.body,
    // fontSize: ve.fontSize,
    // lineHeight: ve.lineHeight,
    // textAlign: ["center"]
    // border: mapValues(vars.border.color, (value) => ({
    //   vars: { [borderWidth]: "1px" },
    //   border: `${borderWidth} solid ${value}`
    // })),
    // borderWidth: mapValues(vars.border.width, (value) => ({
    //   vars: { [borderWidth]: value }
    // })),
  },
  shorthands: {
    p: ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"],
    px: ["paddingLeft", "paddingRight"],
    py: ["paddingTop", "paddingBottom"],
    ps: ["paddingLeft"],
    pe: ["paddingRight"],
    pt: ["paddingTop"],
    pb: ["paddingBottom"],
    m: ["marginTop", "marginBottom", "marginLeft", "marginRight"],
    mx: ["marginLeft", "marginRight"],
    my: ["marginTop", "marginBottom"],
    ms: ["marginLeft"],
    me: ["marginRight"],
    mt: ["marginTop"],
    mb: ["marginBottom"],
  },
});

const colorModeProperties = defineProperties({
  conditions: {
    lightMode: {
      selector: `${lightColorMode} &`,
    },
    darkMode: {
      selector: `${darkColorMode} &`,
    },
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
