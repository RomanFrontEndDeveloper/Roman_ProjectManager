import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

export default function Home() {
  return (
    <main>
      <Card>
        <Input className="max-w-sm" placeholder="Enter email" />

        <Button type="button">Test Button</Button>
      </Card>
    </main>
  );
}
