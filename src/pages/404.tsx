import * as React from "react";
import { Link, HeadFC, PageProps, graphql } from "gatsby";
import { useI18next, Trans } from "gatsby-plugin-react-i18next";

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

export const Head: HeadFC = () => (
  <title>
    <Trans>head</Trans>
  </title>
);

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
