import React from "react";
import { graphql, HeadFC, HeadProps } from "gatsby";
import { useI18next } from "gatsby-plugin-react-i18next";

import { defaultLanguage, LangType } from "../utils/language";
import { SEO } from "../components/SEO";

export default function About() {
  return <>About</>;
}

export const Head: HeadFC = (headProps: HeadProps) => {
  // console.log("headprops", headProps);
  const { location, pageContext } = headProps;
  const {
    t,
    //  language
  } = useI18next();

  return (
    <SEO
      lang={
        ((pageContext as { language: LangType }).language ||
          defaultLanguage) as LangType
      }
      pathname={location.pathname}
    />
  );
};

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
