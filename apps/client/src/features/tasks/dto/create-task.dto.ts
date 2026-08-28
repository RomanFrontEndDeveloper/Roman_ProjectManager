export interface CreateTaskDto {
  title: string;
  description?: string;
  projectId: string;
  assigneeId: string;
  labels?: string[];
  priority?: "low" | "medium" | "high";
  dueDate?: string;
}