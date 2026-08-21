import { Server as HttpServer } from "http";
import { Server } from "socket.io";

export const createSocketServer = (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    //Створюємо Socket.io сервер поверх HTTP сервера.
    cors: {
      origin: "*",
      credentials: true,
    },
  });

  return io;
};

// HttpServer HTTP сервер Node.js
// Server  Socket.IO сервер
