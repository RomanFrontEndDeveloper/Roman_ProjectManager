import { Server } from "socket.io";
import { createPrivateRoom } from "../features/chat/utils/createPrivateRoom.js";

interface PrivateMessagePayload {
  senderId: string;
  receiverId: string;
  message: string;
}

export const registerSocketEvents = (io: Server) => {
  io.on("connection", (socket) => {
    //Користувач підключився
    console.log(`User connected: ${socket.id}`);

    socket.on(
      "join-workspace", //Користувач заходить у Workspace
      (workspaceId: string) => {
        socket.join(workspaceId);

        console.log(`Socket ${socket.id} joined ${workspaceId}`);
      },
    ); //

    socket.on(
      "send-message", //Надсилання повідомлення
      (data) => {
        io.to(data.workspaceId).emit("new-message", data);
      },
    );

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });

    socket.on(
      "join-private-chat",
      ({ senderId, receiverId }: { senderId: string; receiverId: string }) => {
        const room = createPrivateRoom(senderId, receiverId);

        socket.join(room);

        console.log(`${socket.id} joined ${room}`);
      },
    );

    socket.on("send-private-message", (data: PrivateMessagePayload) => {
      const room = createPrivateRoom(data.senderId, data.receiverId);

      io.to(room).emit("new-private-message", data);
    });
  });
};

// Цей файл відповідає за реальну комунікацію через Socket.IO: підключення користувачів,
//  вхід у workspace, відправку повідомлень та відключення користувачів
