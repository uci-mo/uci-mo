import React, { Suspense } from 'react';
import { useI18next } from 'gatsby-plugin-react-i18next';
import { footer, footerP } from './Footer.css';
import Container from '../../basic/Container';

export default function Footer() {
  const { t } = useI18next();
  return (
    <footer className={footer}>
      <Container>
        <p className={footerP}>
          <Suspense fallback={null}>{new Date().getFullYear()}</Suspense> ©
          {' - '}
          {t('footer.builtWith')}
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </p>
      </Container>
    </footer>
  );
}
