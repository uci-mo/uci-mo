import React from 'react';
import { graphql, HeadFC, HeadProps } from 'gatsby';
import { useI18next } from 'gatsby-plugin-react-i18next';
import Container from '../components/basic/Container';
import {
  defaultLanguage,
  getSEOtranslateFn,
  LangType,
  LocaleTDataObj
} from '../components/Locale';
import SEO from '../components/SEO';

// ko sto kaze:
// https://www.buymeacoffee.com/
const About = (): JSX.Element => {
  const { t } = useI18next();
  return (
    <Container>
      <h1>{t('page.about.title')}</h1>
    </Container>
  );
};

export default About;

export const Head: HeadFC<HeadProps<unknown>> = (headProps): JSX.Element => {
  const { location, pageContext, data } = headProps;
  const t = getSEOtranslateFn(data as unknown as LocaleTDataObj);

  return (
    <SEO
      title={t('seo.title')}
      description={t('seo.description')}
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
