import React from "react";
import { defaultLanguage } from "./language";
import { useI18next } from "gatsby-plugin-react-i18next";

export function formatIntlDate(
  date: string | undefined,
  lang: string | undefined
) {
  const usedLang = lang || defaultLanguage;
  return (date ? new Date(date) : new Date())
    .toLocaleDateString(lang)
    .replaceAll(" ", "");
}

// mdx component test
interface FormatDateProps {
  date: string;
}

export function FormatDate({ date }: FormatDateProps) {
  const { language } = useI18next();
  return formatIntlDate(date, language);
}
