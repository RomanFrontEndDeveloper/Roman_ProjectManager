import { UserModel } from "../../auth/models/UserModel.js";
import type { CreateCommentDto } from "../dto/create-comment.dto.js";
import type { UpdateCommentDto } from "../dto/update-comment.dto.js";
import { MentionModel } from "../models/MentionModel.js";
import { CommentRepository } from "../repository/CommentRepository.js";
import { extractMentions } from "../utils/extractMentions.js";

export class CommentService {
  private repository = new CommentRepository();

  async create(data: CreateCommentDto) {
    const comment = await this.repository.create(data);

    const usernames = extractMentions(comment.content);

    for (const username of usernames) {
      const user = await UserModel.findOne({
        name: username,
      });

      if (!user) {
        continue;
      }

      await MentionModel.create({
        commentId: comment._id,
        userId: user._id,
      });
    }

    return comment;
  }

  async getTaskComments(taskId: string) {
    return this.repository.findByTask(taskId);
  }

  async update(
    id: string,
    data: UpdateCommentDto,
  ) {
    const comment =
      await this.repository.update(id, data);

    if (!comment) {
      throw new Error("Comment not found");
    }

    return comment;
  }

  async delete(id: string) {
    const comment =
      await this.repository.delete(id);

    if (!comment) {
      throw new Error("Comment not found");
    }

    return {
      message: "Comment deleted successfully",
    };
  }
}