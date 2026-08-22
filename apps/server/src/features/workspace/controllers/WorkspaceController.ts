import type { Request, Response } from "express";

import { WorkspaceService } from "../services/WorkspaceService.js";

export class WorkspaceController {
  private workspaceService = new WorkspaceService();

  create = async (req: Request, res: Response) => {
    const workspace = await this.workspaceService.create(
      req.body,
      req.user.id as string,
    );

    res.status(201).json(workspace);
  };

  findAll = async (req: Request, res: Response) => {
    const workspaces = await this.workspaceService.findAll();

    res.json(workspaces);
  };

  findById = async (req: Request, res: Response) => {
    const workspace = await this.workspaceService.findById(
      req.params.id as string,
    );

    res.json(workspace);
  };

  update = async (req: Request, res: Response) => {
    const workspace = await this.workspaceService.update(
      req.params.id as string,
      req.body,
      req.user.id,
    );

    res.json(workspace);
  };

  delete = async (req: Request, res: Response) => {
    await this.workspaceService.delete(req.params.id as string, req.user.id);

    res.status(204).send();
  };

  updateRole = async (req: Request, res: Response) => {
    await this.workspaceService.updateRole(
      req.params.workspaceId as string,
      req.params.userId as string,
      req.body.role as string,
      req.user.id,
    );

    res.json({
      message: "Role updated",
    });
  };

  updateSettings = async (req: Request, res: Response) => {
    const workspace = await this.workspaceService.updateSettings(
      req.params.workspaceId as string,
      req.body,
      req.user.id,
    );

    res.json(workspace);
  };
}
