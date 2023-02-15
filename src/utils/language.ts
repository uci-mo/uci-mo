export const languages = ["en", "sr"] as const;
export type LangType = typeof languages[number];
export const defaultLanguage = languages[0];

export const getLocalePathPrefix = (lang: LangType) => {
  if (lang === defaultLanguage || !languages.includes(lang)) return "";
  return `/${lang}`;
};

export function isLang(tested: string): tested is LangType {
  return languages.some((lang) => lang === tested);
}

export function getInitialLang(): LangType {
  const localSetting = localStorage.getItem("locale");
  if (localSetting && isLang(localSetting)) {
    return localSetting;
  }

  const [browserSetting] = navigator.language.split("-");
  if (isLang(browserSetting)) {
    return browserSetting;
  }

  return defaultLanguage;
}

export interface LocaleTDataObj {
  locales: { edges: { node: { data: string } }[] };
}
export function getSEOtObj(data: LocaleTDataObj) {
  const localeString = data.locales?.edges[0].node.data;
  let t;
  if (localeString) {
    t = JSON.parse(localeString);
  }
  return t;
}
