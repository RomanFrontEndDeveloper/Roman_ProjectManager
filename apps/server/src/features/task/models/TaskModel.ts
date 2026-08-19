import { Schema, model, Types } from "mongoose";
import type { TaskStatus } from "../types/task-status.js";
import type { TaskPriority } from "../types/task-priority.js";

export interface ITask {
  title: string;
  description?: string;
  projectId: Types.ObjectId; // Ідентифікатор проєкту, до якого належить задача (projectId містить MongoDB ObjectId)
  assigneeId: Types.ObjectId; // Кому призначена задача (якому User)
  status: TaskStatus; // Статус задачі: "todo", "in_progress" або "done"
  labels: string[]; // Масив рядків, що представляє мітки (labels) задачі
  priority: TaskPriority;
  dueDate?: Date;
}
//приклад: {
//   "title": "Створити Login API",
//   "description": "JWT авторизація",
//   "projectId": "68a31f9a5be4208d746ff1b4",
//   "assigneeId": "67a78484e5ee6507362cea35e",
//   "status": "todo"
// }

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
    },

    projectId: {
      type: Schema.Types.ObjectId, // У MongoDB це поле має бути ObjectId
      ref: "Project",
      required: true,
    },

    assigneeId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["todo", "in_progress", "done"],
      default: "todo",
    },

    labels: {
      type: [String],
      default: [],
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    dueDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

export const TaskModel = model<ITask>("Task", taskSchema);
