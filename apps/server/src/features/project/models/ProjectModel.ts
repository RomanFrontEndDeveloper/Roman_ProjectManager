import {
  Schema,
  model,
  Types,
} from "mongoose";

export interface IProject {
  name: string;//Назва проекту

  description?: string;//Опис проекту   

  workspaceId: Types.ObjectId;//Ідентифікатор робочого простору, до якого належить проект

  ownerId: Types.ObjectId;//Ідентифікатор власника проекту

  members: Types.ObjectId[]; //Ідентифікатори учасників проекту

  status: "active" | "archived";//Статус проекту
}

const projectSchema =
  new Schema<IProject>(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      description: {
        type: String,
      },

      workspaceId: {
        type: Schema.Types.ObjectId,
        ref: "Workspace",
        required: true,
      },

      ownerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      members: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],

      status: {
        type: String,
        enum: [
          "active",
          "archived",
        ],
        default: "active",
      },
    },
    {
      timestamps: true,
    }
  );

export const ProjectModel =
  model<IProject>(
    "Project",
    projectSchema
  );