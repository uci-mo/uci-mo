import type { GatsbyConfig } from "gatsby";

const languages = ["sr", "en"] as const;
const defaultLanguage = languages[0];

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: `https://www.yourdomain.tld`,
    siteTitle: `uci-mo`,
    siteTitleAlt: `uci-mo - Gatsby Theme`,
    siteHeadline: `uci-mo - Gatsby Theme from @mo`,
    // siteUrl: `https://minimal-blog.lekoarts.de`,
    siteDescription: `Typography driven, feature-rich blogging theme with minimal aesthetics. Includes tags/categories support and extensive features for code blocks such as live preview, line numbers, and line highlighting.`,
    // siteImage: `/banner.jpg`,
    author: `@mo`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-vanilla-extract",
    "gatsby-plugin-google-gtag",
    "gatsby-plugin-image",
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        excludes: ["/**/404", "/**/404.html"],
        query: `
            {
              site {
                siteMetadata {
                  siteUrl
                }
              }
              allSitePage(filter: {context: {i18n: {routed: {eq: false}}}}) {
                edges {
                  node {
                    context {
                      i18n {
                        defaultLanguage
                        languages
                        originalPath
                      }
                    }
                    path
                  }
                }
              }
            }
          `,
        serialize: ({
          site,
          allSitePage,
        }: {
          site: { siteMetadata: { siteUrl: string } };
          allSitePage: {
            edges: {
              node: {
                context: {
                  i18n: {
                    languages: string[];
                    originalPath: string;
                    defaultLanguage: string;
                  };
                };
              };
            }[];
          };
        }) => {
          return allSitePage.edges.map((edge) => {
            const { languages, originalPath, defaultLanguage } =
              edge.node.context.i18n;
            const { siteUrl } = site.siteMetadata;
            const url = siteUrl + originalPath;
            const links = [
              { lang: defaultLanguage, url },
              { lang: "x-default", url },
            ];
            languages.forEach((lang: any) => {
              if (lang === defaultLanguage) return;
              links.push({ lang, url: `${siteUrl}/${lang}${originalPath}` });
            });
            return {
              url,
              changefreq: "daily",
              priority: originalPath === "/" ? 1.0 : 0.7,
              links,
            };
          });
        },
      },
    },
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
    // {
    //   resolve: "gatsby-plugin-mdx",
    //   options: {
    //     defaultLayouts: {
    //       default: require.resolve("./src/components/Layout.tsx"),
    //     },
    //   },
    // },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/pages/`,
      },
    },
    // {
    //   resolve: "gatsby-source-filesystem",
    //   options: {
    //     name: "posts",
    //     path: `${__dirname}/src/posts/`,
    //   },
    // },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "locale",
        path: `${__dirname}/locales/`,
      },
    },
    {
      resolve: "gatsby-plugin-react-i18next",
      options: {
        // localeJsonSourceName: `locale`, // name given to `gatsby-source-filesystem` plugin.
        languages,
        defaultLanguage,
        // siteUrl,
        i18nextOptions: {
          // debug: true,
          fallbackLng: defaultLanguage,
          supportedLngs: languages,
          defaultNS: "common",
          interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
          },
        },
      },
    },
  ],
};

export default config;
