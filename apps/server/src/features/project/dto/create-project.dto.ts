export interface CreateProjectDto {
  name: string; //Назва проекту

  description?: string; //Опис проекту

  workspaceId: string; //Це посилання на Workspace, в якому знаходиться Project.
}
