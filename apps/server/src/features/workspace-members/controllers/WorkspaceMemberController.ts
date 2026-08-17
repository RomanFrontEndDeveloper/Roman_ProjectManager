import type { Request, Response } from "express";

import { WorkspaceInviteService } from "../services/WorkspaceMemberService.js";

export class WorkspaceInviteController {
  private service = new WorkspaceInviteService();

  createInvite = async (req: Request, res: Response) => {
    const invite = await this.service.createInvite(
      req.params.workspaceId as string, // Береться з URL.
      req.body.email, // Frontend відправляє
      req.user.id, // передается через authMiddleware 
    );

    res.status(201).json(invite);
  };

  joinWorkspace = async (req: Request, res: Response) => {
    const result = await this.service.joinWorkspace(
      req.params.token as string,// Береться з URL.
      req.user.id,//береться з authMiddleware
    );

    res.json(result);
  };
}
