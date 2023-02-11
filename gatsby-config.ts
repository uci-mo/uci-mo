import type { GatsbyConfig } from "gatsby";

export const languages = ["en", "sr"] as const;
export const defaultLanguage = languages[0];
const siteUrl = "https://uci-mo.netlify.app/";

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl,
    siteTitle: `uci-mo`,
    siteTitleAlt: `uci-mo - Gatsby Theme`,
    siteHeadline: `uci-mo - Gatsby Theme from @mo`,
    siteDescription: `Typography driven, feature-rich blogging theme with minimal aesthetics. Includes tags/categories support and extensive features for code blocks such as live preview, line numbers, and line highlighting.`,
    // siteImage: `/banner.jpg`,
    author: `@mo`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    // "gatsby-plugin-google-gtag",
    "gatsby-plugin-vanilla-extract",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        // name: "gatsby-starter-default",
        // short_name: "starter",
        // start_url: "/",
        background_color: "#663399",
        theme_color: "#663399",
        display: "minimal-ui",
        icon: "./src/images/icon.png",
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: `dominantColor`,
          quality: 50,
          breakpoints: [750, 1080, 1366, 1920],
          backgroundColor: `transparent`,
        },
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "locale",
        path: `${__dirname}/src/locales`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/src/posts`,
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
        ],
        // mdxOptions: {
        //   remarkPlugins: [],
        //   rehypePlugins: [],
        // },
      },
    },
    {
      resolve: "gatsby-plugin-react-i18next",
      options: {
        localeJsonSourceName: `locale`, // name given to `gatsby-source-filesystem` plugin.
        languages,
        defaultLanguage,
        siteUrl,
        i18nextOptions: {
          // debug: true,
          fallbackLng: defaultLanguage,
          supportedLngs: languages,
          defaultNS: "common",
        },
        pages: [
          {
            matchPath: "/:lang?/404",
            getLanguageFromPath: false,
          },
          {
            matchPath: "/:lang?/blog/:uid",
            getLanguageFromPath: true,
            excludeLanguages: languages,
          },
        ],
      },
    },
  ],
};

export default config;
