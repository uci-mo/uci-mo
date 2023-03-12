import React, { useRef } from 'react';
// import { Link, navigate } from "gatsby";
import { Link as LinkI18, useI18next } from 'gatsby-plugin-react-i18next';
import {
  header,
  headerWrap,
  nav,
  navLink,
  navLinkActive,
  navLinksList
} from './Header.css';
// import { pageTransitionDuration } from "../MainWrap";
import Container from '../../basic/Container';
import { ColorModeToggleBtn } from '../../ColorMode';
import LocaleToggleBtn from './LocaleToggleBtn';

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
    <div className={headerWrap}>
      <header className={header}>
        <Container>
          <nav className={nav}>
            <ul className={navLinksList}>
              {routes.map((route) => (
                <li key={route.to}>
                  <LinkI18
                    to={route.to}
                    className={navLink}
                    activeClassName={navLinkActive}
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
    </div>
  );
}
