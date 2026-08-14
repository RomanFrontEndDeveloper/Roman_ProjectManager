import { WorkspaceInviteModel } from "../models/WorkspaceMemberModel.js";

export class WorkspaceInviteRepository {
  async create(data: any) {
    return WorkspaceInviteModel.create(data);
  }

  async findByToken(token: string) {
    return WorkspaceInviteModel.findOne({
      token,
    });
  }

  async findValidInvite(token: string) {
    return WorkspaceInviteModel.findOne({
      token,
      isAccepted: false,
    });
  }

  async acceptInvite(inviteId: string) {
    return WorkspaceInviteModel.findByIdAndUpdate(
      inviteId,
      {
        isAccepted: true,
      },
      {
        new: true,
      },
    );
  }
}
