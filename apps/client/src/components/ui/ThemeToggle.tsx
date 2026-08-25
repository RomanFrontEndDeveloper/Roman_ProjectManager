"use client";

import { useTheme } from "next-themes";

import { Button } from "./Button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      type="button"
      suppressHydrationWarning
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </Button>
  );
}
