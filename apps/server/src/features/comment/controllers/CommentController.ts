import type { Request, Response } from "express";
import { CommentService } from "../services/CommentService.js";

export class CommentController {
  private service = new CommentService();

  create = async (req: Request, res: Response) => {
    const comment = await this.service.create({
      taskId: req.params.taskId as string,
      authorId: req.user.id,
      content: req.body.content,
    });

    res.status(201).json(comment);
  };

  getByTask = async (req: Request, res: Response) => {
    const comments = await this.service.getTaskComments(
      req.params.taskId as string,
    );

    res.json(comments);
  };

  update = async (req: Request, res: Response) => {
    const comment = await this.service.update(
      req.params.id as string,
      req.body,
    );

    res.json(comment);
  };

  delete = async (req: Request, res: Response) => {
    await this.service.delete(req.params.id as string);

    res.json({
      message: "Comment deleted",
    });
  };
}
