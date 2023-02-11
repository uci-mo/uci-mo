import { defaultLanguage } from "./language";

export function formatIntlDate(
  date: string | undefined,
  lang: string | undefined
) {
  return new Intl.DateTimeFormat(lang || defaultLanguage)
    .format(date ? new Date(date) : new Date())
    .replaceAll(" ", "");
}
