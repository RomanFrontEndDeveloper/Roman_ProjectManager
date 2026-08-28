import type { Request, Response } from "express";
import { TaskService } from "../services/TaskService.js";
import type { ReorderTaskDto } from "../dto/reorder-task.dto.js";

export class TaskController {
  private service = new TaskService();

  create = async (req: Request, res: Response) => {
    const task = await this.service.create(req.body, req.user.id);

    res.status(201).json(task);
  };

  update = async (req: Request, res: Response) => {
    const task = await this.service.update(
      req.params.id as string,
      req.user.id,
      req.body,
    );

    res.json(task);
  };

  delete = async (req: Request, res: Response) => {
    await this.service.delete(req.params.id as string, req.user.id);

    res.json({
      message: "Task deleted",
    });
  };

  getById = async (req: Request, res: Response) => {
    const task = await this.service.getById(req.params.id as string);

    res.json(task);
  };

  uploadAttachments = async (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[];

    const attachments = files.map((file: any) => ({
      url: file.path,
      publicId: file.filename,
    }));

    const task = await this.service.uploadAttachments(
      req.params.id as string,
      req.user.id,
      attachments,
    );

    res.json(task);
  };

  reorder = async (req: Request, res: Response) => {
    const data = req.body as ReorderTaskDto;

    const result = await this.service.reorder(data, req.user.id);

    res.json(result);
  };

  getAll = async (req: Request, res: Response) => {
    const tasks = await this.service.getAll();

    res.json(tasks);
  };
}
