import React, { cloneElement, createElement, isValidElement } from "react";
import ThemeProvider from "./src/providers/ThemeProvider";
import Layout from "./src/components/Layout";
import "./src/styles/global.css";
import { overlayContainerId } from "./src/utils/useOverlayPortal";
import {
  GatsbyBrowser,
  WrapPageElementBrowserArgs,
  WrapRootElementBrowserArgs,
} from "gatsby";

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

export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({
  element,
}: WrapRootElementBrowserArgs) => {
  console.log("elementRoot", element);
  return (
    <ThemeProvider>
      {element}
      <div id={overlayContainerId} />
    </ThemeProvider>
  );
};

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({
  element,
  props,
}: WrapPageElementBrowserArgs) => {
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
