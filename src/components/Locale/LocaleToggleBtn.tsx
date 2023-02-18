import React from "react";
import { Link as LinkI18, useI18next } from "gatsby-plugin-react-i18next";

export default function LocaleToggleBtn() {
  const { languages, originalPath, i18n } = useI18next();
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
  );
}
