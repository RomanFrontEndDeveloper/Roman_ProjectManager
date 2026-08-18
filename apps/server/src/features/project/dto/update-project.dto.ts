import type { ProjectStatus } from "../types/project-status.js";

export interface UpdateProjectDto {
  name?: string;

  description?: string;

  status?: ProjectStatus;
}
