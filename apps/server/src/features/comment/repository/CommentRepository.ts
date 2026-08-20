import { CommentModel } from "../models/CommentModel.js";
import type { CreateCommentDto } from "../dto/create-comment.dto.js";
import type { UpdateCommentDto } from "../dto/update-comment.dto.js";

export class CommentRepository {
  create(data: CreateCommentDto) {
    return CommentModel.create(data);
  }

  findByTask(taskId: string) {
    return CommentModel.find({ taskId })
      .populate("authorId", "name email") // Підтяни тільки поля name та email.
      .sort({ createdAt: -1 }); // Сортування коментарів по даті створення.
  }

  findById(id: string) {
    return CommentModel.findById(id); // це ID конкретного коментаря
  }

  update(id: string, data: UpdateCommentDto) {
    return CommentModel.findByIdAndUpdate(
      id, // це ID конкретного коментаря
      data,
      { new: true },
    );
  }

  delete(id: string) {
    // це ID конкретного коментаря
    return CommentModel.findByIdAndDelete(id);
  }
}
