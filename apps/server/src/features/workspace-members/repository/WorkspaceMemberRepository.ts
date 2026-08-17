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
    }); // Перевіряємо, чи запрошення ще не прийнято
  }

  async acceptInvite(inviteId: string) {
    return WorkspaceInviteModel.findByIdAndUpdate(
      inviteId,
      {
        isAccepted: true, // Встановлюємо прапорець isAccepted на true, щоб
        // позначити, щозапрошення прийнято
      },
      {
        new: true,
      },
    );
  }
}
