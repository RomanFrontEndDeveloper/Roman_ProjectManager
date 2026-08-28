export type TaskStatus = "todo" | "in_progress" | "done";

export type TaskPriority = "low" | "medium" | "high";

export interface ChecklistItem {
  text: string;
  completed: boolean;
}

export interface TaskAttachment {
  url: string;
  publicId: string;
}

export interface Task {
  _id: string;
  title: string;
  description?: string;

  projectId: string;
  assigneeId: string;

  status: TaskStatus;
  labels: string[];

  priority: TaskPriority;

  dueDate?: string;

  checklist: ChecklistItem[];

  attachments: TaskAttachment[];

  createdAt: string;
  updatedAt: string;
}
