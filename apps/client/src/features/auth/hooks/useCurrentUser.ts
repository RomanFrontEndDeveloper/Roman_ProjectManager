"use client";

import { useQuery } from "@tanstack/react-query";

import { getMe } from "../api/authApi";

export function useCurrentUser() {
  return useQuery({
    queryKey: ["auth", "me"], // це унікальний ключ,
    // за яким TanStack Query ідентифікує та кешує дані поточного користувача.
    queryFn: getMe,
    retry: false,
  });
}
