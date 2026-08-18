import { Types } from "mongoose";
import { ProjectModel } from "../models/ProjectModel.js";
import type { CreateProjectDto } from "../dto/create-project.dto.js";
import type { UpdateProjectDto } from "../dto/update-project.dto.js";
import type { ProjectStatus } from "../types/project-status.js";

export class ProjectRepository {
  async create(data: CreateProjectDto, ownerId: string) {
    return ProjectModel.create({
      name: data.name, // Назва проекту

      description: data.description, // Опис проекту

      workspaceId: new Types.ObjectId(data.workspaceId), // Це посилання на Workspace, в якому знаходиться Project.

      ownerId: new Types.ObjectId(ownerId), // Ідентифікатор власника проекту.

      members: [new Types.ObjectId(ownerId)], //Під час створення проекту його власник    автоматично додається в список учасників проекту.

      status: "active", //Статус проекту //
    });
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;

    return ProjectModel.find().skip(skip).limit(limit);
  }

  async findById(id: string) {
    return ProjectModel.findById(id);
  }

  // Знайди проект по id,
  //онови його даними з data,
  //і поверни вже оновлений документ.
  async update(id: string, data: UpdateProjectDto) {
    return ProjectModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async delete(id: string) {
    return ProjectModel.findByIdAndDelete(id);
  }

  async search(search: string) {
    return ProjectModel.find({
      name: {
        $regex: search, // Це пошук по шаблону.
        $options: "i", // Не враховувати великі і малі літери.
      },
    });
  }

  async filterByStatus(status: ProjectStatus) {
    return ProjectModel.find({
      status,
    });
  }

  async sort(order: "asc" | "desc") {
    return ProjectModel.find().sort({
      createdAt: order === "asc" ? 1 : -1, // 1 - сортування по зростанню, -1 - сортування по спаданню
    });
  }

  async addMember(projectId: string, userId: string) {
    return ProjectModel.findByIdAndUpdate(
      projectId,
      {
        $addToSet: {
          members: new Types.ObjectId(userId),
        }, // $addToSet - додає елемент до масиву, якщо його там ще немає.
      }, //$addToSet — це оператор MongoDB
      {
        new: true, // Повертає оновлений документ після внесення змін.
      },
    );
  }
}
