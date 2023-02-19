import { style } from "@vanilla-extract/css";
import { breakpoints } from "../../../styles/constants.css";
import { sprinkles } from "../../../styles/sprinkles.css";
import { darkColorMode, ve } from "../../../styles/theme.css";

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

export const container = style([
  {
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "100%",
    paddingLeft: ve.space[3],
    paddingRight: ve.space[3],

    "@media": responsiveMedia,
  },
  // sprinkles({
  //   background: {
  //     lightMode: "red500",
  //     darkMode: "blue500",
  //   },
  // }),
]);
