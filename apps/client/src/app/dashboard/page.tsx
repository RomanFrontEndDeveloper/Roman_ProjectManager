"use client";

import { useEffect, useState } from "react";
import { getMe } from "@/features/auth/api/authApi";
import { Card } from "@/components/ui/Card";

type User = {
  name: string;
  email: string;
  role: string;
};

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const data = await getMe();

      setUser(data.user);
    };

    loadUser();
  }, []);

  if (!user) {
    return <p>Loading...</p>;
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
