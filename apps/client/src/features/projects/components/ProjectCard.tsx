import { Card } from "@/components/ui/Card";

type ProjectCardProps = {
  name: string;
  description?: string;
  status: "active" | "archived";
  tasksCount: number;
};

export function ProjectCard({
  name,
  description,
  status,
  tasksCount,
}: ProjectCardProps) {
  return (
    <Card>
      <h2>{name}</h2>

      <p>{description}</p>

      <p>Status: {status}</p>

      <p>Tasks: {tasksCount}</p>
    </Card>
  );
}