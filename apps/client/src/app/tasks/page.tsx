import { KanbanBoard } from "@/features/tasks/components/KanbanBoard";
import { TaskForm } from "@/features/tasks/components/TaskForm";

export default function TasksPage() {
  return (
    <div>
      <h1 className="mb-4">Tasks</h1>

      <TaskForm />

      <KanbanBoard />
    </div>
  );
}