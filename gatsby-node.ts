import path from "path";
import { GatsbyNode } from "gatsby";
import { defaultLanguage, languages } from "./gatsby-config";

const postTemplate = path.resolve(
  `./src/components/templates/PostTemplate.tsx`
);

interface PostNode {
  id: "string";
  frontmatter: {
    slug: "string";
  };
  internal: {
    contentFilePath: "string";
  };
}

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions;

  const result = await graphql<{ allMdx: { nodes: PostNode[] } }>(`
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

  // Create blog post pages.
  const posts = result.data?.allMdx.nodes || [];

  // you'll call `createPage` for each result
  posts.forEach((node) => {
    const lang =
      languages.find((language) =>
        node.internal.contentFilePath.endsWith(`/index.${language}.mdx`)
      ) || defaultLanguage;
    const localePathPrefix = lang === defaultLanguage ? "" : `${lang}/`;

    createPage({
      // As mentioned above you could also query something else like frontmatter.title above and use a helper function
      // like slugify to create a slug
      path: `${localePathPrefix}blog/${node.frontmatter.slug}`,
      // Provide the path to the MDX content file so webpack can pick it up and transform it into JSX
      // component: node.internal.contentFilePath,
      component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      // You can use the values in this context in
      // our page layout component
      context: { id: node.id },
    });
  });
};
