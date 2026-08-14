import { Schema, model, Types } from "mongoose";

export interface IWorkspaceInvite {
  workspaceId: Types.ObjectId;

  email: string;

  invitedBy: Types.ObjectId;

  token: string;

  isAccepted: boolean;

  expiresAt: Date;
}

const workspaceInviteSchema =
  new Schema<IWorkspaceInvite>(
    {
      workspaceId: {
        type: Schema.Types.ObjectId,
        ref: "Workspace",
        required: true,
      },

      email: {
        type: String,
        required: true,
        lowercase: true,
      },

      invitedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      token: {
        type: String,
        required: true,
        unique: true,
      },

      isAccepted: {
        type: Boolean,
        default: false,
      },

      expiresAt: {
        type: Date,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

export const WorkspaceInviteModel =
  model<IWorkspaceInvite>(
    "WorkspaceInvite",
    workspaceInviteSchema
  );