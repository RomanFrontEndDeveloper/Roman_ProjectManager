import { Types } from "mongoose";

import { WorkspaceModel } from "../models/WorkspaceModel.js";

import type { CreateWorkspaceDto } from "../dto/create-workspace.dto.js";
import type { UpdateWorkspaceDto } from "../dto/update-workspace.dto.js";
import type { UpdateSettingsDto } from "../dto/update-settings.dto.js";

export class WorkspaceRepository {
  async create(data: CreateWorkspaceDto, ownerId: string) {
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

  async update(id: string, data: UpdateWorkspaceDto) {
    return WorkspaceModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async delete(id: string) {
    return WorkspaceModel.findByIdAndDelete(id);
  }

  async addMember(workspaceId: string, userId: string) {
    return WorkspaceModel.findByIdAndUpdate(
      workspaceId,
      {
        $push: {
          //Додає елемент у масив
          members: {
            userId,
            role: "MEMBER",
          },
        },
      },
      {
        new: true,
      },
    );
  }

  async updateRole(workspaceId: string, userId: string, role: string) {
    return WorkspaceModel.updateOne(
      // 2 аргументи: 1. фільтр, 2. оновлення
      {
        _id: workspaceId,
        "members.userId": userId,
      }, // Перший аргумент — фільтр Який документ знайти?
      {
        $set: {
          "members.$.role": role,
        }, // Другий аргумент — оновлення
      },
    );
  }

  async updateSettings(workspaceId: string, settings: UpdateSettingsDto) {
    return WorkspaceModel.findByIdAndUpdate(
      workspaceId, // Перший аргумент — фільтр Який документ знайти?
      {
        settings,
      }, // Другий аргумент — оновлення
      {
        new: true,
      }, // Повернути оновлений документ після оновлення
    );
  }
}
