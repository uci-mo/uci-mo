import { style } from "@vanilla-extract/css";
import { breakpoints } from "../../styles/constants";

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
            maxWidth: `${cur.el}px`,
          },
        },
  {}
);

export const container = style({
  marginLeft: "auto",
  marginRight: "auto",
  maxWidth: "100%",
  paddingLeft: "1rem",
  paddingRight: "1rem",

  "@media": responsiveMedia,
});

// export const container = s({
//   mx: "medium",
//   fontSize: "small",
// });
