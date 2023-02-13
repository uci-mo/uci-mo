import React, { ReactNode } from "react";
import { useI18next } from "gatsby-plugin-react-i18next";
import { useSiteMetadata } from "../utils/useSiteMetadata";
import { LangType } from "../utils/language";

interface SEOProps {
  lang: LangType;
  title?: string;
  description?: string;
  pathname?: string;
  children?: ReactNode;
}

export const SEO = ({
  lang,
  title,
  description,
  pathname,
  children,
}: SEOProps) => {
  const { t, language } = useI18next();
  const {
    title: defaultTitle,
    description: defaultDescription,
    siteImage,
    siteUrl,
    twitterUsername,
  } = useSiteMetadata();

  const seo: { [key: string]: string } = {
    title: title || t(defaultTitle),
    description: description || t(defaultDescription),
    image: `${siteUrl}${siteImage}`,
    url: `${siteUrl}${pathname || ``}`,
    twitterUsername,
  };

  // console.log("language", language);

  return (
    <>
      <html lang={lang} />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:creator" content={seo.twitterUsername} />
      {/* <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>👤</text></svg>"
      /> */}
      {children}
    </>
  );
};
