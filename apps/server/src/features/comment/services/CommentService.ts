import { CommentRepository } from "../repository/CommentRepository.js";
import type { UpdateCommentDto } from "../dto/update-comment.dto.js";
import type { CreateCommentDto } from "../dto/create-comment.dto.js";
import { extractMentions } from "../utils/extractMentions.js";
import { UserModel } from "../../auth/models/UserModel.js";

export class CommentService {
  private repository = new CommentRepository();

  async create(data: CreateCommentDto) {
    const comment = await this.repository.create(data);

    const usernames = extractMentions(comment.content);

    for (const username of usernames) {
      const user = await UserModel.findOne({
        name: username,
      });

      console.log(user);
    }

    for (const username of usernames) {
      console.log(`Mention found: ${username}`);
    }

    console.log(usernames);

    return comment;
  }

  getTaskComments(taskId: string) {
    return this.repository.findByTask(taskId);
  }

  update(id: string, data: UpdateCommentDto) {
    return this.repository.update(id, data);
  }

  delete(id: string) {
    return this.repository.delete(id);
  }
}
