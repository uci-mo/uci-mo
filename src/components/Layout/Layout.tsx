import React, { PropsWithChildren } from 'react';
import { PageProps } from 'gatsby';
import Footer from './Footer';
import Header from './Header';
import MainWrap from './MainWrap';

// revisit Gatsby SLICE later: https://v5.gatsbyjs.com/docs/reference/built-in-components/gatsby-slice/
// https://www.gatsbyjs.com/blog/how-to-use-function-props-with-gatsbys-slice-api/
// with translations: https://www.gatsbyjs.com/blog/using-the-slice-api-for-internationalization-i18n/

export default function Layout(props: PropsWithChildren<PageProps>) {
  const { children, location } = props;
  // console.log("LayoutProps", props);

  return (
    <>
      <Header location={location} />
      <MainWrap>{children}</MainWrap>
      <Footer />
    </>
  );
}
