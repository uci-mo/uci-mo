import * as React from "react";
import { Link, HeadFC, PageProps, graphql } from "gatsby";
import { useI18next, Trans } from "gatsby-plugin-react-i18next";
import Layout from "../components/Layout";

const codeStyles = {
  color: "#8A6534",
  padding: 4,
  backgroundColor: "#FFF4DB",
  fontSize: "1.25rem",
  borderRadius: 4,
};

const NotFoundPage: React.FC<PageProps> = () => {
  const { t } = useI18next();
  return (
    <Layout>
      <h1>{t("title")}</h1>
      <p>
        {t("p")}
        <br />
        <Link to="/">{t("goHomeLink")}</Link>.
      </p>
    </Layout>
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
      filter: { ns: { in: ["404"] }, language: { eq: $language } }
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
