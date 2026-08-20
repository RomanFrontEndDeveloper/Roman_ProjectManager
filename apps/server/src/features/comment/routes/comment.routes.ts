import { Router } from "express";
import { authMiddleware } from "../../auth/middleware/authMiddleware.js";
import { CommentController } from "../controllers/CommentController.js";

const router = Router();

const controller =
  new CommentController();

router.post(
  "/tasks/:taskId/comments",
  authMiddleware,
  controller.create,
);

router.get(
  "/tasks/:taskId/comments",
  authMiddleware,
  controller.getByTask,
);

router.patch(
  "/comments/:id",
  authMiddleware,
  controller.update,
);

router.delete(
  "/comments/:id",
  authMiddleware,
  controller.delete,
);

export default router;