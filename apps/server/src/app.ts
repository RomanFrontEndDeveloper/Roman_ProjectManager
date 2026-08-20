import express from "express";
import helmet from "helmet";
import cors from "cors";
import { env } from "./config/env.js";
import { globalRateLimit } from "./middlewares/rateLimit.js";
import morgan from "morgan";
// Morgan — middleware для логування HTTP-запитів.
// Він показує метод, маршрут, статус і час виконання.
import { errorHandler } from "./middlewares/errorHandler.js";
import authRoutes from "./features/auth/routes/auth.routes.js";
import cookieParser from "cookie-parser";
import workspaceRoutes from "./features/workspace/routes/workspace.routes.js";
import workspaceInviteRoutes from "./features/workspace-members/routes/workspaceMember.routes.js";
import projectRoutes from "./features/project/routes/project.routes.js";
import taskRoutes from "./features/task/routes/task.routes.js";
import commentRoutes from "./features/comment/routes/comment.routes.js";

const app = express();

app.use(helmet()); // middleware, який додає HTTP-заголовки безпеки.

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
    // Дозволяє браузеру надсилати та отримувати cookie.
  }),
);
app.use(globalRateLimit); // кожен HTTP-запит спочатку проходить через
//  globalRateLimit, і лише потім потрапляє в маршрути.

app.use(morgan("dev"));
// підключає middleware, який виводить у консоль інформацію про
//  кожен HTTP-запит у зручному для розробки форматі.
// Дозволяє фронтенду з http://localhost:3000 надсилати HTTP-запити до цього
//  Express-сервера (налаштовує CORS).

app.use(express.json());
app.use(cookieParser());

app.get("/", (_, res) => {
  res.send("Roman Project Manager API");
});
// app.get() — створює маршрут для GET-запиту.
// '/' — головний маршрут (http://localhost:5000/).
// _ — об'єкт request, який тут не використовується.
// res — об'єкт відповіді клієнту.
// res.send() — відправляє текстову відповідь.
// Тобто: коли користувач відкриває http://localhost:5000/, сервер
// повертає текст
// Roman Project Manager API.

app.get("/health", (_, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
    timestamp: new Date().toISOString(),
    smsDefault: "Hello, Romeo",
  });
});

app.use("/api/auth", authRoutes);
//Усі запити, які починаються з /api/auth, передавай у authRoutes

app.use("/api/workspaces", workspaceRoutes);
//Усі запити, які починаються з /api/workspaces, передавай у workspaceRoutes

app.use("/api/workspaces", workspaceInviteRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/tasks", taskRoutes);

app.use("/api", commentRoutes);

// Завжди останнім:
app.use(errorHandler);

export default app;

// 304 - Запитуваний ресурс не змінився з моменту останнього
//  запиту, тому браузер може використати свою кешовану копію.
