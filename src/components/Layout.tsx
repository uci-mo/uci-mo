import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { Link as Linki18, useI18next } from "gatsby-plugin-react-i18next";
import { Link } from "gatsby";
import { useTransition, animated, useSpringRef } from "react-spring";
import { ThemeContext } from "./ThemeProvider";

const routes: { to: string; t: string }[] = [
  { to: "/", t: "nav.home" },
  { to: "/about", t: "nav.about" },
  { to: "/blog", t: "nav.blog" },
];

export default function Layout(props: PropsWithChildren<any>) {
  const { children, location } = props;
  console.log("props", props);
  const { t, languages, originalPath, i18n } = useI18next();
  const { theme, setTheme } = useContext(ThemeContext);
  // const [newChildren, setNewChildren] = useState(null);

  // useEffect(() => {
  //   setNewChildren(children);
  // }, [children]);

  // const transRef = useSpringRef();
  const transitions = useTransition(children, {
    // ref: transRef,
    keys: null,
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-50%,0,0)" },
    config: {
      duration: 1200,
    },
  });

  // useEffect(() => {
  //   transRef.start();
  // }, [location]);

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
