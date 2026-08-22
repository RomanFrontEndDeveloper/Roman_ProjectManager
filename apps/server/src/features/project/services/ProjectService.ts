import { ProjectRepository } from "../repository/ProjectRepository.js";

import type { ProjectStatus } from "../types/project-status.js";
import type { CreateProjectDto } from "../dto/create-project.dto.js";
import type { UpdateProjectDto } from "../dto/update-project.dto.js";

export class ProjectService {
  private repository = new ProjectRepository();

  async create(
    data: CreateProjectDto,
    ownerId: string,
  ) {
    return this.repository.create(
      data,
      ownerId,
    );
  }

  async findAll(
    page: number,
    limit: number,
  ) {
    return this.repository.findAll(
      page,
      limit,
    );
  }

  async findById(id: string) {
    const project =
      await this.repository.findById(id);

    if (!project) {
      throw new Error(
        "Project not found",
      );
    }

    return project;
  }

  async update(
    id: string,
    currentUserId: string,
    data: UpdateProjectDto,
  ) {
    const project =
      await this.repository.findById(id);

    if (!project) {
      throw new Error(
        "Project not found",
      );
    }

    if (
      project.ownerId.toString() !==
      currentUserId
    ) {
      throw new Error(
        "Forbidden"
      );
    }

    return this.repository.update(
      id,
      data,
    );
  }

  async delete(
    id: string,
    currentUserId: string,
  ) {
    const project =
      await this.repository.findById(id);

    if (!project) {
      throw new Error(
        "Project not found",
      );
    }

    if (
      project.ownerId.toString() !==
      currentUserId
    ) {
      throw new Error(
        "Forbidden"
      );
    }

    await this.repository.delete(id);

    return {
      message:
        "Project deleted successfully",
    };
  }

  async search(search: string) {
    return this.repository.search(
      search,
    );
  }

  async filterByStatus(
    status: ProjectStatus,
  ) {
    return this.repository.filterByStatus(
      status,
    );
  }

  async sort(
    order: "asc" | "desc",
  ) {
    return this.repository.sort(order);
  }

  async addMember(
    projectId: string,
    currentUserId: string,
    userId: string,
  ) {
    const project =
      await this.repository.findById(
        projectId,
      );

    if (!project) {
      throw new Error(
        "Project not found",
      );
    }

    if (
      project.ownerId.toString() !==
      currentUserId
    ) {
      throw new Error(
        "Forbidden"
      );
    }

    return this.repository.addMember(
      projectId,
      userId,
    );
  }
}