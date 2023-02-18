import { defaultLanguage, LangType, languages } from "./constants";

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
export function getSEOtranslateFn(data: LocaleTDataObj) {
  const localeString = data.locales?.edges[0].node.data;
  const localeData = JSON.parse(localeString);

  return (tString: string) => {
    const tSteps = tString.split(".");
    let currentStep: any;
    for (let i = 0; i < tSteps.length; i++) {
      const tStep = tSteps[i];
      currentStep = i === 0 ? localeData[tStep] : currentStep[tStep];
    }
    return typeof currentStep === "string" ? currentStep : tString;
  };
}
