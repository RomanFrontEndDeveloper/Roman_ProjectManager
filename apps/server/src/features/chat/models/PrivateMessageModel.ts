import { Schema, model, Types } from "mongoose";

interface IPrivateMessage {
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
  text: string;

  createdAt: Date;
  updatedAt: Date;
}

const privateMessageSchema = new Schema<IPrivateMessage>(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const PrivateMessageModel = model<IPrivateMessage>(
  "PrivateMessage",
  privateMessageSchema,
);