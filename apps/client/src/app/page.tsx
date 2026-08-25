import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { AuthStatus } from "@/features/auth/components/AuthStatus";
import { LoginForm } from "@/features/auth/components/LoginForm";

export default function Home() {
  return (
    <main className="p-4">
      <ThemeToggle />
      <AuthStatus />
      <LoginForm />
      <Card>
        <Input className="max-w-sm" placeholder="Enter email" />

        <Button type="button">Test Button</Button>
      </Card>
    </main>
  );
}
