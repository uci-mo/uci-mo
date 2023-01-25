import React from "react";
import ThemeProvider from "./src/components/ThemeProvider";

export const wrapPageElement = ({ element, props }) => {
  return <ThemeProvider {...props}>{element}</ThemeProvider>;
};

// gatsby-ssr.js and gatsby-browser.js
// const React = require('react');
// const Layout = require('./src/components/Layout').default;

// exports.wrapPageElement = ({ element }) => {
//   const newElement = React.cloneElement(
//     element,  // I18nextProvider
//     element.props,
//     React.cloneElement(
//       element.props.children,  // I18nextContext.Provider
//       element.props.children.props,
//       React.createElement(
//         Layout,
//         undefined,
//         element.props.children.props.children,
//       ),
//     ),
//   );

//   return newElement;
// };
