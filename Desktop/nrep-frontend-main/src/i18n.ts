/* eslint-disable @typescript-eslint/no-floating-promises */
import i18n, { type InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translations
import enTranslation from "@/translations/en.json";
import arTranslation from "@/translations/ar.json";

export type Locale = "ar" | "en";
interface Options extends InitOptions {
  /** @default "en" */
  fallbackLng: Locale;
}

export const i18nOptions: Options = {
  resources: {
    en: {
      translation: enTranslation, // English translations
    },
    ar: {
      translation: arTranslation, // Arabic translations
    },
  },
  fallbackLng: "en", // Default language
  supportedLngs: ["en", "ar"],
  detection: {
    order: ["localStorage", "navigator"], // Detection order
    caches: ["localStorage"], // Where to store detected language
  },
  interpolation: {
    escapeValue: false, // React already safes from XSS
  },
};

i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass the i18n instance to react-i18next
  .init(i18nOptions as InitOptions<Options>);

export default i18n;
