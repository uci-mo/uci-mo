import React from "react";
import { graphql, HeadFC, HeadProps, PageProps } from "gatsby";
import { useI18next } from "gatsby-plugin-react-i18next";

import { SEO } from "../components/SEO";
import { defaultLanguage, LangType } from "../utils/language";

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
    description:
      "A great place to get started if you're new to web development. Designed to guide you through setting up your first Gatsby site.",
    color: "#E95800",
  },
  {
    text: "How to Guides",
    url: "https://www.gatsbyjs.com/docs/how-to/",
    description:
      "Practical step-by-step guides to help you achieve a specific goal. Most useful when you're trying to get something done.",
    color: "#1099A8",
  },
  {
    text: "Reference Guides",
    url: "https://www.gatsbyjs.com/docs/reference/",
    description:
      "Nitty-gritty technical descriptions of how Gatsby works. Most useful when you need detailed information about Gatsby's APIs.",
    color: "#BC027F",
  },
  {
    text: "Conceptual Guides",
    url: "https://www.gatsbyjs.com/docs/conceptual/",
    description:
      "Big-picture explanations of higher-level Gatsby concepts. Most useful for building understanding of a particular topic.",
    color: "#0D96F2",
  },
  {
    text: "Plugin Library",
    url: "https://www.gatsbyjs.com/plugins",
    description:
      "Add functionality and customize your Gatsby site or app with thousands of plugins built by our amazing developer community.",
    color: "#8EB814",
  },
  {
    text: "Build and Host",
    url: "https://www.gatsbyjs.com/cloud",
    description:
      "Now you’re ready to show the world! Give your Gatsby site superpowers: Build and host on Gatsby Cloud. Get started for free!",
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
      <h4>Doc links</h4>
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
      <hr />
      <h4>Links</h4>
      <ul>
        {links.map((link) => (
          <li key={link.url} style={{ color: link.color }}>
            <span>
              <a
                href={`${link.url}?utm_source=starter&utm_medium=start-page&utm_campaign=minimal-starter-ts`}
              >
                {link.text}
              </a>
              <p>{link.description}</p>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default IndexPage;

export const Head: HeadFC<HeadProps> = (headProps) => {
  // console.log("headprops", headProps);
  const { location, pageContext } = headProps;
  const {
    t,
    //  language
  } = useI18next();

  return (
    <SEO
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
  query ($language: String!) {
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
