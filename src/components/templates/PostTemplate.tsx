import React, { PropsWithChildren } from "react";
import { graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

const shortcodes = { Link }; // Provide common components here

export default function PostTemplate({
  data,
  children,
}: PropsWithChildren<{ data: Queries.PostTemplateQuery }>) {
  const title = data.mdx?.frontmatter?.title;
  const date = data.mdx?.frontmatter?.date;
  const image =
    data.mdx?.frontmatter?.featuredImg?.childImageSharp?.gatsbyImageData;

  console.log("data", data);

  return (
    <>
      <h1>{title}</h1>
      <p>{date}</p>
      {image && (
        <GatsbyImage
          image={image}
          alt={`Featured img for: ${title}, file name: ${data.mdx?.internal.contentFilePath}`}
        />
      )}
      <MDXProvider components={shortcodes}>{children}</MDXProvider>
    </>
  );
}

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
