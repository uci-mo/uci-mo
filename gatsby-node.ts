import { GatsbyNode } from 'gatsby';
import {
  defaultLanguage,
  getLocalePathPrefix,
  languages
} from './src/components/Locale';
import path from 'path';

// export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
//   actions
// }) => {
//   actions.setWebpackConfig({
//     resolve: {
//       modules: [path.resolve(__dirname, 'src'), 'node_modules']
//     }
//   });
// };

// export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = (
//   props,
//   pluginOptions
// ) => {
//   const { actions, getConfig } = props;
//   console.log('props', props);

//   const hasPluginOptions = Object.keys(pluginOptions).filter(
//     (item) => item !== 'plugins'
//   ).length;
//   const config = getConfig();
//   const contextSrc = path.join(config.context, 'src');
//   const defaultModules = [contextSrc, 'node_modules'];

//   const { plugins, resolveModules, ...aliasOptions } = pluginOptions;
//   console.log('resolveModules', resolveModules);
//   // if (hasPluginOptions) {
//   //   const modules = resolveModules
//   //     ? [...(resolveModules as []), ...defaultModules]
//   //     : defaultModules;

//   //   actions.setWebpackConfig({
//   //     resolve: {
//   //       alias: { src: contextSrc, ...aliasOptions },
//   //       modules
//   //     }
//   //   });
//   // } else {
//     actions.setWebpackConfig({
//       resolve: {
//         alias: { src: contextSrc },
//         modules: defaultModules
//       }
//     });
//   // }
// };

const postTemplate = path.resolve(`./src/components/markdown/PostTemplate.tsx`);

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
  reporter
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
    reporter.panicOnBuild('Error loading MDX result', result.errors);
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
          id: node.id
        }
      });
    } else {
      reporter.panicOnBuild('Post node is incomplete');
    }
  });
};

// creating Tags pages: https://www.gatsbyjs.com/docs/adding-tags-and-categories-to-blog-posts/
