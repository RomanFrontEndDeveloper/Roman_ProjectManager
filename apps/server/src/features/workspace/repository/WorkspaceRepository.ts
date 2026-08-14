import { Types } from "mongoose";

import { WorkspaceModel } from "../models/WorkspaceModel.js";

import type { CreateWorkspaceDto } from "../dto/create-workspace.dto.js";
import type { UpdateWorkspaceDto } from "../dto/update-workspace.dto.js";
import type { UpdateSettingsDto } from "../dto/update-settings.dto.js";

export class WorkspaceRepository {
  async create(
    data: CreateWorkspaceDto,
    ownerId: string
  ) {
    return WorkspaceModel.create({
      ...data,
      ownerId: new Types.ObjectId(ownerId),
    });
  }

  async findAll() {
    return WorkspaceModel.find();
  }

  async findById(id: string) {
    return WorkspaceModel.findById(id);
  }

  async update(
    id: string,
    data: UpdateWorkspaceDto
  ) {
    return WorkspaceModel.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
      }
    );
  }

  async delete(id: string) {
    return WorkspaceModel.findByIdAndDelete(id);
  }

  async addMember(
    workspaceId: string,
    userId: string
  ) {
    return WorkspaceModel.findByIdAndUpdate(
      workspaceId,
      {
        $push: {
          members: {
            userId,
            role: "MEMBER",
          },
        },
      },
      {
        new: true,
      }
    );
  }

  async updateRole(
    workspaceId: string,
    userId: string,
    role: string
  ) {
    return WorkspaceModel.updateOne(
      {
        _id: workspaceId,
        "members.userId": userId,
      },
      {
        $set: {
          "members.$.role": role,
        },
      }
    );
  }

  async updateSettings(
    workspaceId: string,
    settings: UpdateSettingsDto
  ) {
    return WorkspaceModel.findByIdAndUpdate(
      workspaceId,
      {
        settings,
      },
      {
        new: true,
      }
    );
  }
}