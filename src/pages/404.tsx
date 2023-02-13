import * as React from "react";
import { Link, HeadFC, PageProps, graphql, HeadProps } from "gatsby";
import { useI18next } from "gatsby-plugin-react-i18next";

import { SEO } from "../components/SEO";
import { defaultLanguage, LangType } from "../utils/language";

const NotFoundPage: React.FC<PageProps> = () => {
  const { t } = useI18next();
  return (
    <>
      <h1>{t("page.404.title")}</h1>
      <p>
        {t("page.404.p")}
        <br />
        <Link to="/">{t("page.404.goHomeLink")}</Link>.
      </p>
    </>
  );
};

export default NotFoundPage;

export const Head: HeadFC<HeadProps> = (headProps) => {
  // console.log("headprops", headProps);
  const { location, pageContext } = headProps;
  const {
    t,
    //  language
  } = useI18next();

  return (
    <SEO
      title={t("page.404.title") || ""}
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
