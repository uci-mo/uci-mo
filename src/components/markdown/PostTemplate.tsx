import React, { PropsWithChildren } from 'react';
import { graphql, HeadFC } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { formatIntlDate } from '../../utils/date';
import Container from '../basic/Container';
import {
  defaultLanguage,
  getSEOtranslateFn,
  LangType,
  LocaleTDataObj
} from '../Locale';
import SEO from '../SEO';
import MDX from './MDX';

export default function PostTemplate({
  data,
  children: childrenMDX
}: PropsWithChildren<{ data: Queries.PostTemplateQuery }>) {
  const title = data.mdx?.frontmatter?.title;
  const date = formatIntlDate(
    data.mdx?.frontmatter?.date as string | undefined,
    data.locales.edges[0].node.language as string | undefined
  );
  const tags = data.mdx?.frontmatter?.tags || [];
  const image =
    data.mdx?.frontmatter?.featuredImg?.childImageSharp?.gatsbyImageData;

  return (
    <Container>
      <h1>{title}</h1>
      <p>{date}</p>
      <p>
        {tags.map((tag) => (
          <b key={tag}>#{tag} </b>
        ))}
      </p>
      {image && (
        <GatsbyImage
          image={image}
          alt={`Featured img for: ${title}, file name: ${data.mdx?.internal.contentFilePath}`}
        />
      )}
      <MDX>{childrenMDX}</MDX>
    </Container>
  );
}

export const Head: HeadFC<Queries.PostTemplateQuery> = ({
  location,
  pageContext,
  data
}) => {
  const pCtx = pageContext as {
    language: LangType;
    frontmatter: { title: string; description: string };
  };
  const t = getSEOtranslateFn(data as unknown as LocaleTDataObj);
  const thumbImg =
    data.mdx?.frontmatter?.thumb?.childImageSharp?.gatsbyImageData;

  return (
    <SEO
      lang={(pCtx.language || defaultLanguage) as LangType}
      title={`${t('seo.title')} | ${pCtx.frontmatter.title}`}
      description={pCtx.frontmatter.description}
      pathname={location.pathname}
      siteImage={thumbImg?.images.fallback?.src}
    />
  );
};

export const query = graphql`
  query PostTemplate($id: String!, $language: String!) {
    mdx(id: { eq: $id }) {
      internal {
        contentFilePath
      }
      frontmatter {
        slug
        title
        date
        tags
        featuredImg {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
          }
        }
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
    }
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
