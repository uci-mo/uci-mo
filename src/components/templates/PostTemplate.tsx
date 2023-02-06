import React, { PropsWithChildren } from "react";
import { graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { Link } from "gatsby";

const shortcodes = { Link }; // Provide common components here

export default function PostTemplate({
  data,
  children,
}: PropsWithChildren<{ data: Queries.PostTemplateQuery }>) {
  return (
    <>
      <h1>{data.mdx?.frontmatter?.title}</h1>
      <MDXProvider components={shortcodes}>{children}</MDXProvider>
    </>
  );
}

export const query = graphql`
  query PostTemplate($id: String!, $language: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
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
