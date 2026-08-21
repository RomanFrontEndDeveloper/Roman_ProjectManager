import { Types } from "mongoose";
import { ChatMessageModel } from "../models/ChatMessageModel.js";

export class ChatRepository {
  async create(
    workspaceId: string,
    senderId: string,
    message: string,
  ) {
    return ChatMessageModel.create({
      workspaceId: new Types.ObjectId(
        workspaceId,
      ),
      senderId: new Types.ObjectId(
        senderId,
      ),
      message,
    });
  }

  async findByWorkspace(
    workspaceId: string,
  ) {
    return ChatMessageModel.find({
      workspaceId,
    })
      .populate("senderId", "name email")
      .sort({
        createdAt: 1,
      });
  }
}