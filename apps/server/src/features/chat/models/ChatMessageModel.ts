import { Schema, model, Types } from "mongoose";

interface IChatMessage {
  workspaceId: Types.ObjectId;
  senderId: Types.ObjectId;
  message: string;
}

const chatMessageSchema = new Schema<IChatMessage>(
  {
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },

    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const ChatMessageModel =
  model<IChatMessage>(
    "ChatMessage",
    chatMessageSchema,
  );