import { cloneElement, createElement, isValidElement } from "react";
import ThemeProvider from "./src/components/ThemeProvider";
import Layout from "./src/components/Layout";
import "./src/styles/global.css";

export const wrapPageElement = ({ element, props }) => {
  // console.log("\n------------------\nelement:\n", element,\n------------------);

  return cloneElement(
    element, // I18nextProvider
    element.props,
    isValidElement(element.props.children)
      ? cloneElement(
          element.props.children, // I18nextContext.Provider
          element.props.children?.props,
          createElement(
            ThemeProvider,
            props,
            createElement(Layout, props, element.props.children?.props.children)
          )
        )
      : undefined
  );
};
