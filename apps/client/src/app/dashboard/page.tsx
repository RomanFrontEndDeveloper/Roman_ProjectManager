"use client";

import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";

import { Card } from "@/components/ui/Card";

export default function DashboardPage() {
  const { data, isLoading, isError } = useCurrentUser();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Failed to load user</p>;
  }

  const user = data?.user;

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <Card>
      <h1>Dashboard</h1>

      <div>
        <h2>Welcome, {user.name}</h2>
        <p>{user.email}</p>
        <p>Role: {user.role}</p>
      </div>

      <div>
        <Card>
          <h3>Projects</h3>
          <p>0</p>
        </Card>

        <Card>
          <h3>Tasks</h3>
          <p>0</p>
        </Card>

        <Card>
          <h3>Completed Tasks</h3>
          <p>0</p>
        </Card>

        <Card>
          <h3>Active Tasks</h3>
          <p>0</p>
        </Card>
      </div>
    </Card>
  );
}
