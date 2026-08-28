import type { CreateTaskDto } from "../dto/create-task.dto.js";

import { TaskModel } from "../models/TaskModel.js";

import type { UpdateTaskDto } from "../dto/update-task.dto.js";
import type { ReorderTaskDto } from "../dto/reorder-task.dto.js";

export class TaskRepository {
  async create(data: CreateTaskDto) {
    const lastTask = await TaskModel.findOne({
      status: "todo",
    })
      .sort({ order: -1 })
      .select("order")
      .lean();

    const order = (lastTask?.order ?? -1) + 1;

    return TaskModel.create({
      ...data,
      order,
    });
  }

  async update(id: string, data: Partial<UpdateTaskDto>) {
    return TaskModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return TaskModel.findByIdAndDelete(id);
  }

  async findById(id: string) {
    return TaskModel.findById(id);
  }

  async uploadAttachments(
    id: string,
    attachments: { url: string; publicId: string }[],
  ) {
    return TaskModel.findByIdAndUpdate(
      id,
      {
        $push: {
          attachments: { $each: attachments },
        },
      },
      { new: true },
    );
  }

  async findAll() {
    return TaskModel.find().sort({
      order: 1,
      createdAt: 1,
    });
  }

  async reorder(data: ReorderTaskDto) {
    const operations = data.tasks.map((task) => ({
      updateOne: {
        filter: { _id: task.id },
        update: {
          $set: {
            status: task.status,
            order: task.order,
          },
        },
      },
    }));

    return TaskModel.bulkWrite(operations);
  }
}
