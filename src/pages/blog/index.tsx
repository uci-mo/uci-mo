import React from 'react';
import { graphql, HeadFC, HeadProps, Link, PageProps } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { useI18next } from 'gatsby-plugin-react-i18next';
import Container from '../../components/basic/Container';
import {
  defaultLanguage,
  getSEOtranslateFn,
  LangType,
  LocaleTDataObj
} from '../../components/Locale';
import SEO from '../../components/SEO';
import { formatIntlDate } from '../../utils/date';

const BlogIndexPage: React.FC<PageProps<Queries.BlogIndexPageQuery>> = ({
  data
}) => {
  const { t, language } = useI18next();

  const posts = data.allMdx.edges
    .filter((edge) =>
      edge.node.internal?.contentFilePath?.endsWith(`/index.${language}.mdx`)
    )
    .map((edge) => edge.node);

  return (
    <Container>
      <h1>{t('page.blog.title')}</h1>
      <p>{t('page.blog.p')}</p>
      <div style={{ display: 'grid' }}>
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
      <Link to="/">{t('page.blog.goHomeLink')}</Link>.
    </Container>
  );
};

export default BlogIndexPage;

export const Head: HeadFC<HeadProps<Queries.BlogIndexPageQuery>> = (
  headProps
) => {
  const { location, pageContext, data } = headProps;
  const t = getSEOtranslateFn(data as unknown as LocaleTDataObj);

  return (
    <SEO
      title={`${t('seo.title')} | ${t('page.blog.title')}`}
      description={t('page.blog.p')}
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
