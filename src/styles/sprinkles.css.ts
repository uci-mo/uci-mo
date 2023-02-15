import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";
import { ve } from "./theme.css";

// const breakpoints = {
//   mobile: 0,
//   tablet: 768,
//   desktop: 1200,
// } as const;

// const breakpointsEntries = Object.entries(breakpoints);
// const breakPointsKeys = breakpointsEntries.map(ab)

// const conditions = Object.entries(breakpoints).reduce((acc, breakpoint, bi) => {
//   const [key, value] = breakpoint;
//   return {
//     ...acc,
//     [key]:
//       bi === 0
//         ? {}
//         : {
//             "@media": `screen and (min-width: ${value}px)`,
//           },
//   };
// }, {});

const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: {
      "@media": "screen and (min-width: 768px)",
    },
    desktop: {
      "@media": "screen and (min-width: 1200px)",
    },
  },
  defaultCondition: "mobile",
  responsiveArray: ["mobile", "tablet", "desktop"],
  properties: {
    fontSize: ve.fontSizes,
    lineHeight: ve.lineHeights,
  },
  shorthands: {
    text: ["fontSize", "lineHeight"],
  },
});
export const sprinkles = createSprinkles(responsiveProperties);
