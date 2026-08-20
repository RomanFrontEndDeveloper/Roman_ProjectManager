import { Schema, model } from "mongoose";
import { Types } from "mongoose";

export interface IComment {
  taskId: Types.ObjectId; // береться з url
  authorId: Types.ObjectId; // Із JWT токена, Після authMiddleware:
  content: string; // відправляє фронтенд

  createdAt: Date; // створюються автоматично Mongoose через  timestamps: true
  updatedAt: Date; // створюються автоматично Mongoose через  timestamps: true
}

const commentSchema = new Schema<IComment>(
  {
    taskId: {
      type: Schema.Types.ObjectId,
      ref: "Task", //  taskId посилається на документ Task.
      required: true,
    },

    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User", // authorId посилається на документ User.
      required: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const CommentModel = model<IComment>("Comment", commentSchema);
