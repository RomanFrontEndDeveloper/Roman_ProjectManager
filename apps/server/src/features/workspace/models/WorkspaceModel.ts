import { Schema, model, Types } from "mongoose";

export interface IWorkspace {
  name: string;
  description?: string;
  ownerId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  members: IWorkspaceMember[];
  settings: {
    allowInvites: boolean;
    isPrivate: boolean;
    defaultRole: WorkspaceRole;
  };
}
export interface IWorkspaceMember {
  userId: Types.ObjectId;
  role: WorkspaceRole;
}

export enum WorkspaceRole {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

const workspaceSchema = new Schema<IWorkspace>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    description: {
      type: String,
      default: "",
      maxlength: 500,
    },

    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    members: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },

        role: {
          type: String,
          enum: Object.values(WorkspaceRole),
          default: WorkspaceRole.MEMBER,
        },
      },
    ],

    settings: {
  allowInvites: {
    type: Boolean,
    default: true,
  },

  isPrivate: {
    type: Boolean,
    default: false,
  },

  defaultRole: {
    type: String,
    enum: Object.values(
      WorkspaceRole
    ),
    default: WorkspaceRole.MEMBER,
  },
},
  },
  {
    timestamps: true,
  },
);

export const WorkspaceModel = model<IWorkspace>("Workspace", workspaceSchema);
