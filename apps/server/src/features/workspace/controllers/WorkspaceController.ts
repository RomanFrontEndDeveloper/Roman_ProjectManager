import type { Request, Response, NextFunction } from "express";
import { WorkspaceService } from "../services/WorkspaceService.js";

export class WorkspaceController {
  private workspaceService = new WorkspaceService();

  public createWorkspace = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const workspace = await this.workspaceService.createWorkspace(req.body);

      res.status(201).json({
        success: true,
        workspace,
      });
    } catch (error) {
      next(error);
    }
  };

  public getAllWorkspaces = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const workspaces =
      await this.workspaceService.getAllWorkspaces();

    res.json({
      success: true,
      workspaces,
    });
  } catch (error) {
    next(error);
  }
};

public getWorkspaceById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const workspace =
      await this.workspaceService.getWorkspaceById(
        req.params.id as string,
      );

    res.json({
      success: true,
      workspace,
    });
  } catch (error) {
    next(error);
  }
};

public updateWorkspace = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const workspace =
      await this.workspaceService.updateWorkspace(
        req.params.id as string,
        req.body,
      );

    res.json({
      success: true,
      workspace,
    });
  } catch (error) {
    next(error);
  }
};

public deleteWorkspace = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await this.workspaceService.deleteWorkspace(
      req.params.id as string,
    );

    res.json({
      success: true,
      message: 'Workspace deleted',
    });
  } catch (error) {
    next(error);
  }
};
}
