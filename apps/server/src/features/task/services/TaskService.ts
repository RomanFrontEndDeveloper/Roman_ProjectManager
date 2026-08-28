import type { CreateTaskDto } from "../dto/create-task.dto.js";
import type { UpdateTaskDto } from "../dto/update-task.dto.js";

import { TaskRepository } from "../repository/TaskRepository.js";

import { checkOwnership } from "../../../shared/utils/checkOwnership.js";

export class TaskService {
  constructor(private repository = new TaskRepository()) {}

  async create(data: CreateTaskDto) {
    return this.repository.create(data);
  }

  async update(
    id: string,
    currentUserId: string,
    data: Partial<UpdateTaskDto>,
  ) {
    const task = await this.repository.findById(id);

    if (!task) {
      throw new Error("Task not found");
    }

    const isOwner = checkOwnership(task.assigneeId.toString(), currentUserId);

    if (!isOwner) {
      throw new Error("Forbidden");
    }

    return this.repository.update(id, data);
  }

  async delete(id: string, currentUserId: string) {
    const task = await this.repository.findById(id);

    if (!task) {
      throw new Error("Task not found");
    }

    const isOwner = checkOwnership(task.assigneeId.toString(), currentUserId);

    if (!isOwner) {
      throw new Error("Forbidden");
    }

    return this.repository.delete(id);
  }

  async getById(id: string) {
    const task = await this.repository.findById(id);

    if (!task) {
      throw new Error("Task not found");
    }

    return task;
  }

  async uploadAttachments(
    id: string,
    currentUserId: string,
    attachments: {
      url: string;
      publicId: string;
    }[],
  ) {
    const task = await this.repository.findById(id);

    if (!task) {
      throw new Error("Task not found");
    }

    const isOwner = checkOwnership(task.assigneeId.toString(), currentUserId);

    if (!isOwner) {
      throw new Error("Forbidden");
    }

    return this.repository.uploadAttachments(id, attachments);
  }

  async getAll() {
    return this.repository.findAll();
  }
}
