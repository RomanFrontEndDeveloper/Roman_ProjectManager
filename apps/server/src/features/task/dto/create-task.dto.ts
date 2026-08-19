import type { TaskPriority } from "../types/task-priority.js";
export interface CreateTaskDto {
  title: string;
  description?: string;

  projectId: string;
  assigneeId: string;

  labels?: string[];

  priority?: TaskPriority;
  dueDate?: Date;
}
