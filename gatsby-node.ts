import path from "path";
import { GatsbyNode } from "gatsby";
import {
  languages,
  defaultLanguage,
  getLocalePathPrefix,
} from "./src/components/Locale";

const postTemplate = path.resolve(
  `./src/components/PostTemplate/PostTemplate.tsx`
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
            date
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

      // Create blog post pages.
      createPage({
        // slugify to create a slug? a српски?
        path: `${getLocalePathPrefix(lang)}/blog/${node.frontmatter.slug}`,
        // Provide the path to the MDX content file so webpack can pick it up and transform it into JSX
        component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
        // You can use the values in this context in our page layout component
        context: {
          id: node.id,
        },
      });
    } else {
      reporter.panicOnBuild("Post node is incomplete");
    }
  });
};

// creating Tags pages: https://www.gatsbyjs.com/docs/adding-tags-and-categories-to-blog-posts/
