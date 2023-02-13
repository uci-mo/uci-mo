import React from "react";
import { graphql, HeadFC, HeadProps } from "gatsby";
import { useI18next } from "gatsby-plugin-react-i18next";

import {
  defaultLanguage,
  getSEOt,
  LangType,
  LocaleTDataObj,
} from "../utils/language";
import { SEO } from "../components/SEO";

export default function About() {
  return <>About</>;
}

export const Head: HeadFC<HeadProps<unknown>> = (headProps) => {
  const { location, pageContext, data } = headProps;
  const t = getSEOt(data as unknown as LocaleTDataObj);

  return (
    <SEO
      title={t.seo.title}
      description={t.seo.description}
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
