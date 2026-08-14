import { WorkspaceRepository } from "../repository/WorkspaceRepository.js";
import type { CreateWorkspaceDto } from "../dto/create-workspace.dto.js";
import type { UpdateWorkspaceDto } from "../dto/update-workspace.dto.js";
import type { UpdateSettingsDto } from "../dto/update-settings.dto.js";
export class WorkspaceService {
  private workspaceRepository = new WorkspaceRepository();

  async create(dto: CreateWorkspaceDto, ownerId: string) {
    return this.workspaceRepository.create(dto, ownerId);
  }

  async findAll() {
    return this.workspaceRepository.findAll();
  }

  async findById(id: string) {
    return this.workspaceRepository.findById(id);
  }

  async update(id: string, dto: UpdateWorkspaceDto) {
    return this.workspaceRepository.update(id, dto);
  }

  async delete(id: string) {
    return this.workspaceRepository.delete(id);
  }

  async updateRole(workspaceId: string, userId: string, role: string) {
    return this.workspaceRepository.updateRole(workspaceId, userId, role);
  }

  async updateSettings(
  workspaceId: string,
  settings: UpdateSettingsDto
) {
  return this.workspaceRepository.updateSettings(
    workspaceId,
    settings
  );
}
}
