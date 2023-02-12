import React, { cloneElement, createElement, isValidElement } from "react";
import ThemeProvider from "./src/providers/ThemeProvider";
import Layout from "./src/components/Layout";
import "./src/styles/global.css";

// Called when the initial (but not subsequent) render of Gatsby App is done on the client.
// exports.onInitialClientRender = () => {
//   console.log("ReactDOM.render has executed")
// }

//Called when the Gatsby browser runtime first starts.
// exports.onClientEntry = () => {
//   console.log("We've started!")
//   callAnalyticsAPI()
// }

// Logs when the client route changes
// exports.onRouteUpdate = ({ location, prevLocation }) => {
//   console.log("new pathname", location.pathname)
//   console.log("old pathname", prevLocation ? prevLocation.pathname : null)
// }

// exports.onRouteUpdateDelayed = () => {
//   console.log("We can show loading indicator now")
// }

export const wrapRootElement = ({ element }) => {
  console.log("elementRoot", element);
  return <ThemeProvider>{element}</ThemeProvider>;
};

export const wrapPageElement = ({ element, props }) => {
  return cloneElement(
    element, // I18nextProvider
    element.props,
    isValidElement(element.props.children)
      ? cloneElement(
          element.props.children, // I18nextContext.Provider
          element.props.children?.props,
          createElement(Layout, props, element.props.children?.props.children)
        )
      : undefined
  );
};
