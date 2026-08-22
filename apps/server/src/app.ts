import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { env } from "./config/env.js";
import { API_VERSION } from "./config/apiVersion.js";

import { globalRateLimit } from "./middlewares/rateLimit.js";
import { errorHandler } from "./middlewares/errorHandler.js";

import authRoutes from "./features/auth/routes/auth.routes.js";
import workspaceRoutes from "./features/workspace/routes/workspace.routes.js";
import workspaceInviteRoutes from "./features/workspace-members/routes/workspaceMember.routes.js";
import projectRoutes from "./features/project/routes/project.routes.js";
import taskRoutes from "./features/task/routes/task.routes.js";
import commentRoutes from "./features/comment/routes/comment.routes.js";

import { swaggerUi, swaggerSpec } from "./config/swagger.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(globalRateLimit);

app.use(morgan("dev"));

app.use(express.json());

app.use(cookieParser());

app.get("/", (_, res) => {
  res.send("Roman Project Manager API");
});

app.get(`/api/${API_VERSION}/health`, (_, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
    timestamp: new Date().toISOString(),
    smsDefault: "Hello, Romeo",
  });
});

/*
|--------------------------------------------------------------------------
| API v1 Routes
|--------------------------------------------------------------------------
*/

app.use(`/api/${API_VERSION}/auth`, authRoutes);

app.use(`/api/${API_VERSION}/workspaces`, workspaceRoutes);

app.use(`/api/${API_VERSION}/workspaces`, workspaceInviteRoutes);

app.use(`/api/${API_VERSION}/projects`, projectRoutes);

app.use(`/api/${API_VERSION}/tasks`, taskRoutes);

app.use(`/api/${API_VERSION}`, commentRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/*
|--------------------------------------------------------------------------
| Error Handler
|--------------------------------------------------------------------------
*/



app.use(errorHandler);

export default app;
