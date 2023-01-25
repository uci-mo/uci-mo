import React from "react";
import { ThemeProvider } from "./src/components/ThemeProvider";

export const wrapPageElement = ({ element, props }) => {
  return <ThemeProvider {...props}>{element}</ThemeProvider>;
};
