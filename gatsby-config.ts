import type { GatsbyConfig } from "gatsby";
import { languages, defaultLanguage } from "./src/components/Locale";
import { breakpoints } from "./src/styles/constants";

const siteUrl = "https://uci-mo.netlify.app/";

const config: GatsbyConfig = {
  siteMetadata: {
    title: "УчиМо",
    description:
      "УчиМо је сајт који сведочи покушајима да Мо научи нешто ново научи и покаже.",
    twitterUsername: `@uci-mo`,
    siteImage: `/uci-mo-banner.jpg`,
    siteUrl,
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
    "gatsby-plugin-image",
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
        path: `${__dirname}/src/components/Locale/translations`,
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
              maxWidth: breakpoints.xxl.el,
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
          lowerCaseLng: true,
          saveMissing: false,
          interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
          },
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
