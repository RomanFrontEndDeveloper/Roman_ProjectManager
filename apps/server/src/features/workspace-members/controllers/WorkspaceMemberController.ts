import type { Request, Response } from "express";

import { WorkspaceInviteService } from "../services/WorkspaceMemberService.js";

export class WorkspaceInviteController {
  private service =
    new WorkspaceInviteService();

createInvite = async (
  req: Request,
  res: Response
) => {
  const invite =
    await this.service.createInvite(
      req.params.workspaceId as string,
      req.body.email,
      req.user.id
    );

  res.status(201).json(invite);
};  

  joinWorkspace = async (
  req: Request,
  res: Response
) => {
  const result =
    await this.service.joinWorkspace(
      req.params.token as string,
      req.user.id
    );

  res.json(result);
};
}