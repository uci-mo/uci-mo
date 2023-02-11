import React, { PropsWithChildren } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";

// revisit Gatsby SLICE later: https://v5.gatsbyjs.com/docs/reference/built-in-components/gatsby-slice/
// https://www.gatsbyjs.com/blog/how-to-use-function-props-with-gatsbys-slice-api/
// with translations: https://www.gatsbyjs.com/blog/using-the-slice-api-for-internationalization-i18n/

export default function Layout(props: PropsWithChildren<any>) {
  const { children } = props;
  console.log("LayoutProps", props);

  return (
    <>
      <Header />
      <hr />
      <Main>{children}</Main>
      <hr />
      <Footer />
    </>
  );
}
