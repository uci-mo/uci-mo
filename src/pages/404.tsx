import React, { FC } from 'react';
import { graphql, HeadFC, HeadProps, PageProps } from 'gatsby';
import { Link as Linki18n, useI18next } from 'gatsby-plugin-react-i18next';
import Container from '../components/basic/Container';
import {
  defaultLanguage,
  getSEOtranslateFn,
  LangType,
  LocaleTDataObj
} from '../components/Locale';
import SEO from '../components/SEO';

const NotFoundPage: FC<PageProps> = () => {
  const { t } = useI18next();
  return (
    <Container>
      <h1>{t('page.404.title')}</h1>
      <p>
        {t('page.404.p')}
        <br />
        <Linki18n to="/">{t('page.404.goHomeLink')}</Linki18n>.
      </p>
    </Container>
  );
};

export default NotFoundPage;

export const Head: HeadFC<HeadProps<unknown>> = (headProps) => {
  const { location, pageContext, data } = headProps;
  const t = getSEOtranslateFn(data as unknown as LocaleTDataObj);

  return (
    <SEO
      title={`${t('seo.title')} | ${t('page.404.title')}`}
      description={t('page.404.p')}
      lang={
        ((pageContext as { language: LangType }).language ||
          defaultLanguage) as LangType
      }
      pathname={location.pathname}
    />
  );
};

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
