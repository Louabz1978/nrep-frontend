import type { Locale } from "@/i18n";

export type UseLanguageRes = {
  toggleLocale: () => void;
  changeLanguage: (locale: Locale) => void;
  locale: Locale;
  languages: Locale[];
};
