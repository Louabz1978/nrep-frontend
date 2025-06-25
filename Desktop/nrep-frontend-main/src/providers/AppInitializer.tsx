import useLanguage, { RTL_Locales } from "@/hooks/global/useLanguage";
import { useTheme } from "@/hooks/global/useTheme";
import type { Locale } from "@/i18n";
import { useEffect, type ReactNode } from "react";

function AppInitializer({ children }: { children: ReactNode }) {
  useTheme();
  const { locale } = useLanguage();

  useEffect(() => {
    if (RTL_Locales.includes(locale as Locale)) {
      document.documentElement.setAttribute("dir", "rtl");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
    }
    document.documentElement.setAttribute("lang", locale);
  }, [locale]);

  return children;
}

export default AppInitializer;
