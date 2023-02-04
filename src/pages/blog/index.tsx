import { graphql, HeadFC, Link, PageProps } from "gatsby";
import { useI18next, Trans } from "gatsby-plugin-react-i18next";
import React from "react";

const BlogIndexPage: React.FC<PageProps<Queries.BlogIndexPageQuery>> = ({
  data,
}) => {
  const { t, language } = useI18next();
  const posts = data.allMdx.edges
    .filter((edge) =>
      edge.node.internal?.contentFilePath?.endsWith(`/index.${language}.mdx`)
    )
    .map((edge) => edge.node);

  return (
    <>
      <h1>{t("title")}</h1>
      <p>{t("p")}</p>
      <ul>
        {posts.map(({ id, frontmatter }) => {
          const slug = frontmatter?.slug;
          const title = frontmatter?.title;
          if (!(id && slug && title)) return null;

          return (
            <li key={id}>
              <Link to={slug} activeClassName="">
                {title}
              </Link>
            </li>
          );
        })}
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

    allMdx {
      edges {
        node {
          id
          frontmatter {
            slug
            title
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  }
`;
