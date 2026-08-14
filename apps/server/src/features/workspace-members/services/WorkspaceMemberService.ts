import crypto from "crypto";
import { WorkspaceInviteRepository } from "../repository/WorkspaceMemberRepository.js";
import { WorkspaceRepository } from "../../workspace/repository/WorkspaceRepository.js";

export class WorkspaceInviteService {
  private repository = new WorkspaceInviteRepository();
  private workspaceRepository = new WorkspaceRepository();

  async createInvite(workspaceId: string, email: string, userId: string) {
    const token = crypto.randomBytes(32).toString("hex");

    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);

    return this.repository.create({
      workspaceId,
      email,
      invitedBy: userId,
      token,
      expiresAt,
    });
  }

  async joinWorkspace(token: string, userId: string) {
    const invite = await this.repository.findValidInvite(token);

    if (!invite) {
      throw new Error("Invite not found");
    }

    if (invite.expiresAt < new Date()) {
      throw new Error("Invite expired");
    }

    await this.workspaceRepository.addMember(
      invite.workspaceId.toString(),
      userId,
    );

    await this.repository.acceptInvite(invite.id);

    return {
      message: "Workspace joined successfully",
    };
  }
}
