export interface CreateTaskDto {
  title: string;
  description?: string;
  projectId: string;
  assigneeId: string;
}
