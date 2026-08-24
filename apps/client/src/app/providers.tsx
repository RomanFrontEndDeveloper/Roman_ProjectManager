"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {children}
    </ThemeProvider>
  );
}

// Тобто Providers фактично говорить:
// «Весь мій додаток буде працювати всередині ThemeProvider».

// А children — це сторінки та компоненти.

// ThemeProvider створює контекст теми.
// useTheme() шукає найближчий ThemeProvider вище по дереву.
// enableSystem={false} - Не використовуй автоматично тему операційної системи.
// attribute="class" - каже next-themes: «Визначай тему через CSS-клас на <html>
