import path from "path";
import { GatsbyNode } from "gatsby";
import { defaultLanguage, languages } from "./gatsby-config";

const postTemplate = path.resolve(
  `./src/components/templates/PostTemplate.tsx`
);

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions;

  const result = await graphql<Queries.AllMarkdownFilesQuery>(`
    query AllMarkdownFiles {
      allMdx {
        nodes {
          id
          frontmatter {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild("Error loading MDX result", result.errors);
  }

  const posts = result.data?.allMdx.nodes || [];

  posts.forEach((node) => {
    if (node.internal.contentFilePath && node.frontmatter?.slug) {
      const lang =
        languages.find((language) =>
          node.internal.contentFilePath?.endsWith(`/index.${language}.mdx`)
        ) || defaultLanguage;
      const localePathPrefix = lang === defaultLanguage ? "" : `${lang}/`;

      // Create blog post pages.
      createPage({
        // slugify to create a slug? a српски?
        path: `${localePathPrefix}blog/${node.frontmatter.slug}`,
        // Provide the path to the MDX content file so webpack can pick it up and transform it into JSX
        component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
        // You can use the values in this context in our page layout component
        context: { id: node.id },
      });
    } else {
      reporter.panicOnBuild("Post node is incomplete");
    }
  });
};
