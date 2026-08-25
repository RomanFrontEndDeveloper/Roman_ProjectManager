"use client";

import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/authApi";

export function AuthStatus() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Not authenticated</p>;
  }

  return <p>Hello, {data?.user.email}</p>;
}