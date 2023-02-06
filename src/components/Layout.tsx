import React, { PropsWithChildren, useContext } from "react";
import { Link as LinkI18, useI18next } from "gatsby-plugin-react-i18next";
import { useTransition, animated } from "react-spring";
import { ThemeContext } from "./ThemeProvider";

const routes: { to: string; t: string }[] = [
  { to: "/", t: "nav.home" },
  { to: "/about", t: "nav.about" },
  { to: "/blog", t: "nav.blog" },
];
// revisit Gatsby SLICE later: https://v5.gatsbyjs.com/docs/reference/built-in-components/gatsby-slice/
// https://www.gatsbyjs.com/blog/how-to-use-function-props-with-gatsbys-slice-api/
// with translations: https://www.gatsbyjs.com/blog/using-the-slice-api-for-internationalization-i18n/

export default function Layout(props: PropsWithChildren<any>) {
  const { children, location } = props;
  console.log("props", props);
  const { t, languages, originalPath, i18n } = useI18next();
  const { theme, setTheme } = useContext(ThemeContext);

  const transitions = useTransition(children, {
    keys: null,
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-50%,0,0)" },
    config: {
      duration: 1200,
    },
  });

  return (
    <>
      <header>
        <div>LOGO</div>
        <hr />
        <nav>
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
          <hr />

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
          <hr />
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme}
          </button>
        </nav>
      </header>
      <hr />
      {/* scrolling transition to prevous position when clicking Back */}
      {/* https://janessagarrow.com/blog/gatsby-framer-motion-page-transitions/#bonus */}
      <main
        style={{ overflowX: "hidden", display: "grid", gridTemplate: '"main"' }}
      >
        {transitions((style, passedChildren) => (
          <animated.div style={{ ...style, gridArea: "main" }}>
            {passedChildren}
          </animated.div>
        ))}
      </main>

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
