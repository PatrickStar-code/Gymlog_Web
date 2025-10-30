"use client";

import { createContext, useEffect, useState, ReactNode } from "react";

type ThemeType = {
  theme: string;
  setTheme: (theme: string) => void;
  handleChangeTheme: () => void;
};

export const ThemeContext = createContext({} as ThemeType);

export default function ThemeContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    setTheme(isDarkMode);
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Toggle theme
  const handleChangeTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, handleChangeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
