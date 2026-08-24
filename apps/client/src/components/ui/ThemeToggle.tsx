"use client";

import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      suppressHydrationWarning
      onClick={() =>
        setTheme(theme === "light" ? "dark" : "light")
      }
      className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}