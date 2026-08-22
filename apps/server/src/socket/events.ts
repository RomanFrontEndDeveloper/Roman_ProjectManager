import { Server } from "socket.io";

import { createPrivateRoom } from "../features/chat/utils/createPrivateRoom.js";
import { onlineUsers } from "./onlineUsers.js";

interface WorkspaceMessagePayload {
  workspaceId: string;
  senderId: string;
  message: string;
}

interface PrivateMessagePayload {
  senderId: string;
  receiverId: string;
  message: string;
}

interface PrivateChatPayload {
  senderId: string;
  receiverId: string;
}

interface TypingPayload {
  workspaceId: string;
  userId: string;
}

export const registerSocketEvents = (io: Server) => {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // =====================================
    // Workspace Chat
    // =====================================

    socket.on("join-workspace", (workspaceId: string) => {
      socket.join(workspaceId);

      console.log(`Socket ${socket.id} joined ${workspaceId}`);
    });

    socket.on("send-message", (data: WorkspaceMessagePayload) => {
      io.to(data.workspaceId).emit("new-message", data);
    });

    // =====================================
    // Private Chat
    // =====================================

    socket.on(
      "join-private-chat",
      ({ senderId, receiverId }: PrivateChatPayload) => {
        const room = createPrivateRoom(senderId, receiverId);

        socket.join(room);

        console.log(`${socket.id} joined ${room}`);
      },
    );

    socket.on("send-private-message", (data: PrivateMessagePayload) => {
      const room = createPrivateRoom(data.senderId, data.receiverId);

      io.to(room).emit("new-private-message", data);
    });

    // =====================================
    // Online Users
    // =====================================

    socket.on("user-online", (userId: string) => {
      onlineUsers.set(userId, socket.id);

      io.emit("online-users", Array.from(onlineUsers.keys()));

      console.log(`User ${userId} online`);
    });

    socket.on("get-online-users", () => {
      socket.emit("online-users", Array.from(onlineUsers.keys()));
    });

    // =====================================
    // Typing Indicator
    // =====================================

    socket.on("typing-start", ({ workspaceId, userId }: TypingPayload) => {
      socket.to(workspaceId).emit("user-typing", userId);
    });

    socket.on("typing-stop", ({ workspaceId, userId }: TypingPayload) => {
      socket.to(workspaceId).emit("user-stop-typing", userId);
    });

    // =====================================
    // Disconnect
    // =====================================

    socket.on("disconnect", () => {
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }

      io.emit("online-users", Array.from(onlineUsers.keys()));

      console.log(`User disconnected: ${socket.id}`);
    });
  });
};
