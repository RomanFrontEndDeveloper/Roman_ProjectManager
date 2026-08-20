import { CommentRepository } from "../repository/CommentRepository.js";

export class CommentService {
  private repository =
    new CommentRepository();

  create(data: any) {
    return this.repository.create(data);
  }

  getTaskComments(taskId: string) {
    return this.repository.findByTask(taskId);
  }

  update(id: string, data: any) {
    return this.repository.update(id, data);
  }

  delete(id: string) {
    return this.repository.delete(id);
  }
}