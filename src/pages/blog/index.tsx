import { graphql, HeadFC, Link, PageProps } from "gatsby";
import { useI18next, Trans } from "gatsby-plugin-react-i18next";
import React from "react";

const BlogIndexPage: React.FC<PageProps<Queries.BlogIndexPageQuery>> = ({
  data,
}) => {
  const { t } = useI18next();
  const posts = data.allFile.nodes;

  return (
    <>
      <h1>{t("title")}</h1>
      <p>{t("p")}</p>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={post.name} activeClassName="">
              {post.name}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/">{t("goHomeLink")}</Link>.
    </>
  );
};

export default BlogIndexPage;

export const Head: HeadFC = () => (
  <title>
    <Trans>head</Trans>
  </title>
);

export const query = graphql`
  query BlogIndexPage($language: String!) {
    locales: allLocale(
      filter: { ns: { in: ["blog", "common"] }, language: { eq: $language } }
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }

    allFile(filter: { sourceInstanceName: { eq: "posts" } }) {
      nodes {
        name
        id
      }
    }
  }
`;
