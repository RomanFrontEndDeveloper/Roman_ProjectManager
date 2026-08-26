"use client";

import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class" // Коли змінюється тема, 
        // додавай назву теми як CSS-клас до <html> (tailwind)
        defaultTheme="light"
        enableSystem={false} // Не використовуй системну тему Windows як джерело теми.
      >
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}

// Тобто Providers фактично говорить:
// «Весь мій додаток буде працювати всередині ThemeProvider».

// А children — це сторінки та компоненти.

// ThemeProvider створює контекст теми.
// useTheme() шукає найближчий ThemeProvider вище по дереву.
// enableSystem={false} - Не використовуй автоматично тему операційної системи.
// attribute="class" - каже next-themes: «Визначай тему через CSS-клас на <html>


// const queryClient = new QueryClient();
// створює React Query client — об'єкт, який керує:
// cache даних;
// запитами;
// loading;
// errors;
// refetch;
// mutations;
// invalidation.


{/* <QueryClientProvider client={queryClient}>
робить цей queryClient доступним для React-компонентів через useQuery, useMutation, useQueryClient тощо. */}

