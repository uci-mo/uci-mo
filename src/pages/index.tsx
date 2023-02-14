import React from "react";
import { graphql, HeadFC, HeadProps, PageProps } from "gatsby";
import { useI18next } from "gatsby-plugin-react-i18next";

import { SEO } from "../components/SEO";
import {
  defaultLanguage,
  getSEOt,
  LangType,
  LocaleTDataObj,
} from "../utils/language";

const docLinks = [
  {
    text: "TypeScript Documentation",
    url: "https://www.gatsbyjs.com/docs/how-to/custom-configuration/typescript/",
    color: "#8954A8",
  },
  {
    text: "GraphQL Typegen Documentation",
    url: "https://www.gatsbyjs.com/docs/how-to/local-development/graphql-typegen/",
    color: "#8954A8",
  },
];

const links = [
  {
    text: "Tutorial",
    url: "https://www.gatsbyjs.com/docs/tutorial/",
    color: "#E95800",
  },
  {
    text: "How to Guides",
    url: "https://www.gatsbyjs.com/docs/how-to/",
    color: "#1099A8",
  },
  {
    text: "Reference Guides",
    url: "https://www.gatsbyjs.com/docs/reference/",
    color: "#BC027F",
  },
  {
    text: "Conceptual Guides",
    url: "https://www.gatsbyjs.com/docs/conceptual/",
    color: "#0D96F2",
  },
  {
    text: "Plugin Library",
    url: "https://www.gatsbyjs.com/plugins",
    color: "#8EB814",
  },
  {
    text: "Build and Host",
    url: "https://www.gatsbyjs.com/cloud",
    color: "#663399",
  },
];

const IndexPage: React.FC<PageProps> = (indexProps) => {
  // console.log("indexProps", indexProps);
  const { t } = useI18next();
  return (
    <>
      <h1>
        <span>-- {t("page.home.title")} 🎉🎉🎉</span>
      </h1>
      <h4>Documentation:</h4>
      <ul>
        {docLinks.map((doc) => (
          <li key={doc.url}>
            <a
              href={`${doc.url}?utm_source=starter&utm_medium=ts-docs&utm_campaign=minimal-starter-ts`}
            >
              {doc.text}
            </a>
          </li>
        ))}
      </ul>

      <h4>To investigate:</h4>
      <ul>
        {links.map((link) => (
          <li key={link.url} style={{ color: link.color }}>
            <a
              style={{ color: link.color }}
              href={`${link.url}?utm_source=starter&utm_medium=start-page&utm_campaign=minimal-starter-ts`}
            >
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default IndexPage;

export const Head: HeadFC<HeadProps<Queries.LocalesQuery>> = (headProps) => {
  // console.log("headprops", headProps);
  const { location, pageContext, data } = headProps;
  const t = getSEOt(data as unknown as LocaleTDataObj);

  return (
    <SEO
      title={t.seo.title}
      description={t.seo.description}
      lang={
        ((pageContext as { language: LangType }).language ||
          defaultLanguage) as LangType
      }
      pathname={location.pathname}
    />
  );
};

// query specific common.json file with translations:
// filter: { ns: { in: ["common"] }, language: { eq: $language } }
// but this is useless here, since during page transition you can see text being replaced
export const query = graphql`
  query Locales($language: String!) {
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
