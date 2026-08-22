import mongoose from "mongoose";
import http from "http";
import app from "./app.js";
import { env } from "./config/env.js";
import { createSocketServer } from "./socket/socketServer.js";
import { registerSocketEvents } from "./socket/events.js";

await mongoose.connect(env.MONGODB_URI);

console.log("MongoDB connected");

// Створюємо HTTP сервер: ✅ Express працює через HTTP Server
// Саме це потрібно Socket.io.
const httpServer = http.createServer(app);

// Створюємо Socket.io сервер
const io = createSocketServer(httpServer);

// Реєструємо всі socket події (connection disconnect)
registerSocketEvents(io);

// Запускаємо сервер
httpServer.listen(env.PORT, () => {
  console.log(
    `Server is running on http://localhost:${env.PORT}`,
  );
});

// Origin складається з трьох частин: Protocol + Domain + Port
// приклад: http://localhost:3000
// app.listen(env.PORT); --> Сервер працюватиме, просто
// ти не отримаєш повідомлення в консолі.
