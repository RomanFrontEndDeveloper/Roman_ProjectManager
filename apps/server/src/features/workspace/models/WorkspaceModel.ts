import { Schema, model, Types } from "mongoose";

interface IWorkspace {
  name: string; // Name of the workspace
  description: string;
  owner: Types.ObjectId; // Reference to the User model
}

const workspaceSchema = new Schema<IWorkspace>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const WorkspaceModel = model<IWorkspace>("Workspace", workspaceSchema); //
