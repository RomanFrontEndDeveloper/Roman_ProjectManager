import type { Request, Response } from "express";
import type { ProjectStatus } from "../types/project-status.js";
import { ProjectService } from "../services/ProjectService.js";

export class ProjectController {
  private service = new ProjectService();

  create = async (req: Request, res: Response) => {
    const project = await this.service.create(
      req.body, // приходить з body запиту
      req.user.id, // приходить з authMiddleware
    );

    res.status(201).json(project);
  };

  findAll = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const projects = await this.service.findAll(page, limit);

    res.json(projects);
  };

  findById = async (req: Request, res: Response) => {
    const project = await this.service.findById(req.params.id as string);

    res.json(project);
  };

  update = async (req: Request, res: Response) => {
    const project = await this.service.update(
      req.params.id as string,
      req.user.id,
      req.body,
    );

    res.json(project);
  };

  delete = async (req: Request, res: Response) => {
   const result = await this.service.delete(
  req.params.id as string,
  req.user.id,
);

    res.json(result);
  };

  search = async (req: Request, res: Response) => {
    const search = req.query.search as string; // req.query = {
    // search: "roman"
    //}

    const projects = await this.service.search(search);

    res.json(projects);
  };

  filterByStatus = async (req: Request, res: Response) => {
    const status = req.query.status as ProjectStatus;

    const projects = await this.service.filterByStatus(status);

    res.json(projects);
  };

  sort = async (req: Request, res: Response) => {
    const order = (req.query.sort as "asc" | "desc") || "desc";

    const projects = await this.service.sort(order);

    res.json(projects);
  };

  addMember = async (req: Request, res: Response) => {
    const project = await this.service.addMember(
  req.params.id as string,
  req.user.id,
  req.body.userId,
);

    res.json(project);
  };
}
