import React, { PropsWithChildren, useContext } from "react";
import { Link as Linki18, useI18next } from "gatsby-plugin-react-i18next";
import { Link } from "gatsby";
import { ThemeContext } from "./ThemeProvider";

const routes: { to: string; t: string }[] = [
  { to: "/", t: "nav.home" },
  { to: "/about", t: "nav.about" },
  { to: "/blog", t: "nav.blog" },
];

export default function Layout({ children }: PropsWithChildren) {
  const { t, languages, originalPath, i18n } = useI18next();
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <>
      <header>
        <div>LOGO</div>
        <hr />
        <nav>
          <ul>
            {routes.map((route) => (
              <li key={route.to}>
                <Link to={route.to} activeClassName="">
                  {t(route.t)}
                </Link>
              </li>
            ))}
          </ul>
          <hr />

          <ul className="languages">
            {languages.map((lng) => (
              <li key={lng}>
                <Linki18
                  to={originalPath}
                  language={lng}
                  style={{
                    textDecoration:
                      i18n.resolvedLanguage === lng ? "underline" : "none",
                  }}
                >
                  {lng}
                </Linki18>
              </li>
            ))}
          </ul>
          <hr />
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme}
          </button>
        </nav>
      </header>
      <hr />

      <main>{children}</main>

      <hr />
      <footer>
        <p>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </p>
      </footer>
    </>
  );
}
