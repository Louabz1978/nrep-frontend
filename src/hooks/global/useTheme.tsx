import { useCallback, useLayoutEffect, useState } from "react";

type Theme = "light" | "dark";

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>("light");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  useLayoutEffect(() => {
    try {
      const savedTheme = localStorage.getItem("USER_THEME") as Theme | null;
      const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");

      setTheme(initialTheme);
      document.documentElement.classList.toggle(
        "dark",
        initialTheme === "dark"
      );
    } catch (error) {
      console.error("Error reading theme from storage:", error);
    }
  }, [systemPrefersDark]);

  const changeTheme = useCallback((theme: Theme) => {
    setTheme(theme);
    localStorage.setItem("USER_THEME", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    changeTheme(newTheme);
  }, [changeTheme, theme]);

  return { theme, toggleTheme };
};
