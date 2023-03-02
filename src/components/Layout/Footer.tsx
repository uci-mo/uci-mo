import React, { Suspense } from 'react';
import { useI18next } from 'gatsby-plugin-react-i18next';
import Container from '../basic/Container';

export default function Footer() {
  const { t } = useI18next();
  return (
    <footer style={{ borderTop: '1px solid black' }}>
      <Container>
        <p>
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
