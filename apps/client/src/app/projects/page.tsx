import { ProjectsList } from "@/features/projects/components/ProjectsList";

const projects = [
  {
    id: "1",
    name: "Roman Project Manager",
    description: "Project management application",
    status: "active" as const,
    tasksCount: 12,
  },
  {
    id: "2",
    name: "Real Estate",
    description: "Real estate platform",
    status: "active" as const,
    tasksCount: 8,
  },
  {
    id: "3",
    name: "Old Project",
    description: "Archived project",
    status: "archived" as const,
    tasksCount: 25,
  },
];

export default function ProjectsPage() {
  return (
    <div>
      <h1>Projects</h1>

      <ProjectsList projects={projects} />
    </div>
  );
}