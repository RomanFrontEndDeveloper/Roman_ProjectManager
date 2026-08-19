import type { CreateTaskDto } from "../dto/create-task.dto.js";
import type { UpdateTaskDto } from "../dto/update-task.dto.js";
import { TaskRepository } from "../repository/TaskRepository.js";

export class TaskService {
  constructor(private repository = new TaskRepository()) {}

  async create(data: CreateTaskDto) {
    return this.repository.create(data);
  }

  async update(id: string, data: Partial<UpdateTaskDto>) {
    return this.repository.update(id, data);
  }

  async delete(id: string) {
    return this.repository.delete(id);
  }

  async getById(id: string) {
    const task = await this.repository.findById(id);

    if (!task) {
      throw new Error("Task not found");
    }

    return task;
  }
}
