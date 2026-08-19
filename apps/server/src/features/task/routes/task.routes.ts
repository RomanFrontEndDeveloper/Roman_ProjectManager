import { Router } from "express";

import { authMiddleware } from "../../auth/middleware/authMiddleware.js";

import { TaskController } from "../controllers/TaskController.js";

const router = Router();

const taskController = new TaskController();

router.post("/", authMiddleware, taskController.create);

router.patch("/:id", authMiddleware, taskController.update);

router.delete("/:id", authMiddleware, taskController.delete);

export default router;
