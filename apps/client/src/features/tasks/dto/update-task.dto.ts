export interface UpdateTaskDto {
  title?: string;
  description?: string;
  assigneeId?: string;
  status?: "todo" | "in_progress" | "done";
  labels?: string[];
  priority?: "low" | "medium" | "high";
  dueDate?: string;
}