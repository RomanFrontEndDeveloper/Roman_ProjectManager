import { ProjectCard } from "./ProjectCard";

type Project = {
  id: string;
  name: string;
  description?: string;
  status: "active" | "archived";
  tasksCount: number;
};

type ProjectsListProps = {
  projects: Project[];
};

export function ProjectsList({ projects }: ProjectsListProps) {
  if (projects.length === 0) {
    return <p>No projects yet.</p>;
  }

  return (
    <div>
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          name={project.name}
          description={project.description}
          status={project.status}
          tasksCount={project.tasksCount}
        />
      ))}
    </div>
  );
}