import * as React from "react";
import { Link, HeadFC, PageProps, graphql } from "gatsby";
import { useI18next, Trans } from "gatsby-plugin-react-i18next";

const NotFoundPage: React.FC<PageProps> = () => {
  const { t } = useI18next();
  return (
    <>
      <h1>{t("title")}</h1>
      <p>
        {t("p")}
        <br />
        <Link to="/">{t("goHomeLink")}</Link>.
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
    locales: allLocale(
      filter: { ns: { in: ["404", "common"] }, language: { eq: $language } }
    ) {
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
