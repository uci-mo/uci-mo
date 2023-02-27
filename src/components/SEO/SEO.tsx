import React, { ReactNode } from 'react';
import { useSiteMetadata } from '../../utils/useSiteMetadata';
import { LangType } from '../Locale';

interface SEOProps {
  lang: LangType;
  title?: string;
  siteImage?: string;
  description?: string;
  pathname?: string;
  children?: ReactNode;
}

// investigate:
// https://www.gatsbyjs.com/docs/how-to/adding-common-features/adding-seo-component/#rich-snippets

const SEO = ({
  lang,
  title,
  description,
  siteImage,
  pathname,
  children
}: SEOProps) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    siteImage: defaultSiteImage,
    siteUrl,
    twitterUsername
  } = useSiteMetadata();

  const seo: { [key: string]: string } = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${siteImage || defaultSiteImage}`,
    url: `${siteUrl}${pathname || ``}`,
    twitterUsername
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
        href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' 
        viewBox='0 0 100 100'><text y='0.9em' font-size='90'>👤</text></svg>"
      /> */}
      {children}
    </>
  );
};

export default SEO;
