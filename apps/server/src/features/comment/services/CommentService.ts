import { CommentRepository } from "../repository/CommentRepository.js";
import type { UpdateCommentDto } from "../dto/update-comment.dto.js";
import type { CreateCommentDto } from "../dto/create-comment.dto.js";
export class CommentService {
  private repository =
    new CommentRepository();

  create(data: CreateCommentDto) {
    return this.repository.create(data);
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