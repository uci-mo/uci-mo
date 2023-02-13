import React from "react";
import { graphql, HeadFC, HeadProps, Link, PageProps } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { useI18next } from "gatsby-plugin-react-i18next";

import { formatIntlDate } from "../../utils/date";
import { defaultLanguage, LangType } from "../../utils/language";
import { SEO } from "../../components/SEO";

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
      <h1>{t("page.blog.title")}</h1>
      <p>{t("page.blog.p")}</p>
      <div style={{ display: "grid" }}>
        {posts.map(({ id, frontmatter }) => {
          const slug = frontmatter?.slug;
          const title = frontmatter?.title;
          const date = formatIntlDate(
            frontmatter?.date as string | undefined,
            language
          );
          const tags = frontmatter?.tags || [];
          if (!(id && slug && title)) return null;

          const image = frontmatter?.thumb?.childImageSharp?.gatsbyImageData;

          return (
            <Link key={id} to={slug} activeClassName="">
              <div>
                <h3>{title}</h3>
                <p>{date}</p>
                <p>
                  {tags.map((tag) => (
                    <b key={tag}>#{tag} </b>
                  ))}
                </p>
                <div>{image && <GatsbyImage image={image} alt={title} />}</div>
              </div>
            </Link>
          );
        })}
      </div>
      <Link to="/">{t("page.blog.goHomeLink")}</Link>.
    </>
  );
};

export default BlogIndexPage;

export const Head: HeadFC<HeadProps<Queries.BlogIndexPageQuery>> = (
  headProps
) => {
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
  query BlogIndexPage($language: String!) {
    locales: allLocale(
      filter: { ns: { in: ["common"] }, language: { eq: $language } }
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
            date
            tags
            thumb {
              childImageSharp {
                gatsbyImageData(
                  width: 500
                  placeholder: BLURRED
                  blurredOptions: { width: 100 }
                  transformOptions: { cropFocus: CENTER }
                  aspectRatio: 1.3
                )
              }
            }
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  }
`;
