import { checkOwnership } from "../../../shared/utils/checkOwnership.js";
import { checkAdminPermission } from "../../../shared/utils/checkAdminPermission.js";

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
    const workspace = await this.workspaceRepository.findById(id);

    if (!workspace) {
      throw new Error("Workspace not found");
    }

    return workspace;
  }

  async update(id: string, dto: UpdateWorkspaceDto, currentUserId: string) {
    const workspace = await this.workspaceRepository.findById(id);

    if (!workspace) {
      throw new Error("Workspace not found");
    }

    if (!checkOwnership(workspace.ownerId.toString(), currentUserId)) {
      throw new Error("Forbidden");
    }

    return this.workspaceRepository.update(id, dto);
  }

  async delete(id: string, currentUserId: string) {
    const workspace = await this.workspaceRepository.findById(id);

    if (!workspace) {
      throw new Error("Workspace not found");
    }

    if (!checkOwnership(workspace.ownerId.toString(), currentUserId)) {
      throw new Error("Forbidden");
    }

    await this.workspaceRepository.delete(id);

    return {
      message: "Workspace deleted successfully",
    };
  }

  async updateRole(
    workspaceId: string,
    userId: string,
    role: string,
    currentUserId: string,
  ) {
    const workspace = await this.workspaceRepository.findById(workspaceId);

    if (!workspace) {
      throw new Error("Workspace not found");
    }

    const isOwner = workspace.ownerId.toString() === currentUserId;

    const currentMember = workspace.members.find(
      (member) => member.userId.toString() === currentUserId,
    );

    if (!checkAdminPermission(isOwner, currentMember?.role)) {
      throw new Error("Forbidden");
    }

    return this.workspaceRepository.updateRole(workspaceId, userId, role);
  }

  async updateSettings(
    workspaceId: string,
    settings: UpdateSettingsDto,
    currentUserId: string,
  ) {
    const workspace = await this.workspaceRepository.findById(workspaceId);

    if (!workspace) {
      throw new Error("Workspace not found");
    }

    const isOwner = workspace.ownerId.toString() === currentUserId;

    const currentMember = workspace.members.find(
      (member) => member.userId.toString() === currentUserId,
    );

    if (!checkAdminPermission(isOwner, currentMember?.role)) {
      throw new Error("Forbidden");
    }

    return this.workspaceRepository.updateSettings(workspaceId, settings);
  }
}
