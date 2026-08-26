"use client";

import { useCurrentUser } from "../hooks/useCurrentUser";

export function AuthStatus() {
  const { data, isLoading, isError } = useCurrentUser();
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Not authenticated</p>;
  }

  return <p>Hello, {data?.user.email}</p>;
}
