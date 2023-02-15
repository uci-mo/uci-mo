import React, { useRef } from "react";
import ColorModeToggleBtn from "./ColorModeToggleBtn";
import { Link, navigate } from "gatsby";
import { Link as LinkI18, useI18next } from "gatsby-plugin-react-i18next";
import { pageTransitionDuration } from "../Main";

const routes: { to: string; t: string }[] = [
  { to: "/", t: "nav.home" },
  { to: "/about/", t: "nav.about" },
  { to: "/blog/", t: "nav.blog" },
];

interface HeaderProps {
  location: any;
}

export default function Header({ location }: HeaderProps) {
  const { t, languages, originalPath, i18n } = useI18next();
  // const { t, i18n } = useTranslation();
  // const langChangeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
  //   null
  // );

  // const changeLang = (lang: LangType) => {
  //   navigate(
  //     `${i18n.language === defaultLanguage ? "" : `/${i18n.language}`}${
  //       location.pathname
  //     }`
  //   );

  //   if (langChangeTimeoutRef.current)
  //     clearTimeout(langChangeTimeoutRef.current);

  //   langChangeTimeoutRef.current = setTimeout(() => {
  //     i18n.changeLanguage(lang);
  //     langChangeTimeoutRef.current = null;
  //   }, pageTransitionDuration);
  // };

  // console.log("i18n", i18n);
  // getLangRoutePrefix(i18.language)

  return (
    <header style={{ borderBottom: "1px solid black" }}>
      <nav style={{ display: "flex", justifyContent: "space-between" }}>
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
                  borderLeft: "10px solid red",
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

        <ul className="languages">
          {languages.map((lng) => (
            <li key={lng}>
              <LinkI18
                to={originalPath}
                language={lng}
                style={
                  i18n.resolvedLanguage === lng
                    ? {
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
      </nav>
    </header>
  );
}
