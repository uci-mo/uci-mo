import * as React from "react";
import { Link, HeadFC, PageProps, graphql, HeadProps } from "gatsby";
import { useI18next } from "gatsby-plugin-react-i18next";

import { SEO } from "../components/SEO";
import {
  defaultLanguage,
  getSEOt,
  LangType,
  LocaleTDataObj,
} from "../utils/language";

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

export const Head: HeadFC<HeadProps<unknown>> = (headProps) => {
  const { location, pageContext, data } = headProps;
  const t = getSEOt(data as unknown as LocaleTDataObj);

  return (
    <SEO
      title={t.page[404].title}
      description={t.page[404].p}
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
