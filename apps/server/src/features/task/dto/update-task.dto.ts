import type { TaskPriority } from "../types/task-priority.js";

export interface UpdateTaskDto {
  title?: string;

  description?: string;

  assigneeId?: string;

  status?: string;

  labels?: string[];

  priority?: TaskPriority;

  dueDate?: Date;
}
