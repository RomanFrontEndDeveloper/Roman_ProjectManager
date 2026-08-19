import type { Request, Response } from "express";
import { TaskService } from "../services/TaskService.js";

export class TaskController {
  private service = new TaskService();

  create = async (req: Request, res: Response) => {
    const task = await this.service.create(req.body);

    res.status(201).json(task);
  };

  update = async (req: Request, res: Response) => {
    const task = await this.service.update(req.params.id as string, req.body);

    res.json(task);
  };

  delete = async (req: Request, res: Response) => {
    await this.service.delete(req.params.id as string);

    res.json({
      message: "Task deleted",
    });
  };

  getById = async (req: Request, res: Response) => {
    const task = await this.service.getById(req.params.id as string);

    res.json(task);
  };
}
