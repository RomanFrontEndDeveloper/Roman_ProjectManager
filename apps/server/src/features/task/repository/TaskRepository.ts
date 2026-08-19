import type { CreateTaskDto } from "../dto/create-task.dto.js";
import { TaskModel } from "../models/TaskModel.js";
import type { UpdateTaskDto } from "../dto/update-task.dto.js";

export class TaskRepository {
  async create(data: CreateTaskDto) {
    return TaskModel.create(data);
  }

  async update(id: string, data: Partial<UpdateTaskDto>) {
    return TaskModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return TaskModel.findByIdAndDelete(id);
  }
}
