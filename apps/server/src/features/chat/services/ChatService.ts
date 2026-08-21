import { ChatRepository } from "../repository/ChatRepository.js";

export class ChatService {
  constructor(
    private chatRepository =
      new ChatRepository(),
  ) {}

  async createMessage(
    workspaceId: string,
    senderId: string,
    message: string,
  ) {
    return this.chatRepository.create(
      workspaceId,
      senderId,
      message,
    );
  }

  async getMessages(
    workspaceId: string,
  ) {
    return this.chatRepository.findByWorkspace(
      workspaceId,
    );
  }
}