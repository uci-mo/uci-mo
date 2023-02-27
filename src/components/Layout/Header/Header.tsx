import React, { useRef } from 'react';
// import { Link, navigate } from "gatsby";
import { Link as LinkI18, useI18next } from 'gatsby-plugin-react-i18next';
// import { pageTransitionDuration } from "../Main";
import Container from '../../basic/Container';
import { ColorModeToggleBtn } from '../../ColorMode';
import { LocaleToggleBtn } from '../../Locale';

const routes: { to: string; t: string }[] = [
  { to: '/', t: 'nav.home' },
  { to: '/about/', t: 'nav.about' },
  { to: '/blog/', t: 'nav.blog' }
];

interface HeaderProps {
  location: any;
}

export default function Header({ location }: HeaderProps) {
  const { t, originalPath } = useI18next();

  return (
    <header style={{ borderBottom: '1px solid black' }}>
      <Container>
        <nav style={{ display: 'flex', justifyContent: 'space-between' }}>
          <ul>
            {/* {routes.map((route) => (
            <li key={route.to}>
              <Link
                to={route.to}
                activeClassName=""
                activeStyle={{
                  textDecoration: "underline",
                  borderLeft: "10px solid red",
                }}
              >
                {t(route.t)}
              </Link>
            </li>
          ))} */}
            {routes.map((route) => (
              <li key={route.to}>
                <LinkI18
                  to={route.to}
                  activeClassName=""
                  activeStyle={{
                    border: '10px solid transparent',
                    borderRightColor: 'red',
                    borderRadius: '50%'
                  }}
                >
                  <span
                    onClick={(e) => {
                      if (originalPath === route.to) e.preventDefault();
                    }}
                  >
                    {t(route.t)}
                  </span>
                </LinkI18>
              </li>
            ))}
          </ul>

          <ColorModeToggleBtn />
          <LocaleToggleBtn />
        </nav>
      </Container>
    </header>
  );
}
