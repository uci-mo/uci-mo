export const languages = ["en", "sr"] as const;
export type LangType = typeof languages[number];
export const defaultLanguage = languages[0];
