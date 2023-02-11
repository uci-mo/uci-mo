import React from "react";
import { Link as LinkI18, useI18next } from "gatsby-plugin-react-i18next";
import ThemeBtn from "./ThemeBtn";

const routes: { to: string; t: string }[] = [
  { to: "/", t: "nav.home" },
  { to: "/about", t: "nav.about" },
  { to: "/blog", t: "nav.blog" },
];

export default function Header() {
  const { t, languages, originalPath, i18n } = useI18next();

  return (
    <header>
      <nav style={{ display: "flex" }}>
        <ul>
          {routes.map((route) => (
            <li key={route.to}>
              <LinkI18
                to={route.to}
                activeClassName=""
                activeStyle={{
                  textDecoration: "underline",
                  borderLeft: "10px solid red",
                }}
              >
                {t(route.t)}
              </LinkI18>
            </li>
          ))}
        </ul>

        <ul className="languages">
          {languages.map((lng) => (
            <li key={lng}>
              <LinkI18
                to={originalPath}
                language={lng}
                style={
                  i18n.resolvedLanguage === lng
                    ? {
                        textDecoration: "underline",
                        borderLeft: "10px solid red",
                        pointerEvents: "none",
                      }
                    : {}
                }
              >
                {lng}
              </LinkI18>
            </li>
          ))}
        </ul>
        <ThemeBtn />
      </nav>
    </header>
  );
}
