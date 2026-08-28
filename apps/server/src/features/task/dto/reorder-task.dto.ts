import type { TaskStatus } from "../types/task-status.js";

export interface ReorderTaskItem {
  id: string;
  status: TaskStatus;
  order: number;
}

export interface ReorderTaskDto {
  tasks: ReorderTaskItem[];
}   