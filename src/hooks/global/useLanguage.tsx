import type { Locale } from "@/i18n";
import i18n from "@/i18n";
import type { UseLanguageRes } from "@/types/global/languages";
import { useState } from "react";

export const RTL_Locales: Locale[] = ["ar"];

function useLanguage(): UseLanguageRes {
  const [locale, setLocale] = useState(localStorage.getItem("USER_LOCALE"));

  const updateDoc = (locale: Locale) => {
    if (RTL_Locales.includes(locale)) {
      document.documentElement.setAttribute("dir", "rtl");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
    }
    document.documentElement.setAttribute("lang", locale);
    localStorage.setItem("USER_LOCALE", locale);
    setLocale(locale);
  };

  async function changeLanguage(locale: Locale) {
    await i18n.changeLanguage(locale);
    updateDoc(locale);
  }

  function toggleLocale() {
    changeLanguage(["ar", "en"]?.find((ele) => ele != locale) as Locale);
  }

  return {
    toggleLocale,
    changeLanguage,
    locale: locale as Locale,
    languages: ["ar", "en"],
  };
}

export default useLanguage;
