import { Router } from "express";

import { authMiddleware } from "../../auth/middleware/authMiddleware.js";

import { TaskController } from "../controllers/TaskController.js";
import { upload } from "../../../config/multer.js";

const router = Router();

const taskController = new TaskController();

router.post("/", authMiddleware, taskController.create);

router.patch("/:id", authMiddleware, taskController.update);

router.delete("/:id", authMiddleware, taskController.delete);

router.get("/:id", authMiddleware, taskController.getById);

router.post(
  "/:id/attachments",
  upload.array("files", 10),
  taskController.uploadAttachments,
);

router.get("/", authMiddleware, taskController.getAll);

export default router;
