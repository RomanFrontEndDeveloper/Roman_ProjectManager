import { Router } from "express";
import { authMiddleware } from "../../auth/middleware/authMiddleware.js";
import { WorkspaceController } from "../controllers/WorkspaceController.js";

const router = Router();

const workspaceController =
  new WorkspaceController();

router.post(
  "/",
  authMiddleware,
  workspaceController.create
);

router.get(
  "/",
  authMiddleware,
  workspaceController.findAll
);

router.get(
  "/:id",
  authMiddleware, 
  workspaceController.findById
);

router.patch(
  "/:id",
  authMiddleware,
  workspaceController.update
);

router.delete(
  "/:id",
  authMiddleware,
  workspaceController.delete
);

router.patch(
  "/:workspaceId/members/:userId/role",
  authMiddleware,
  workspaceController.updateRole
);

router.patch(
  "/:workspaceId/settings",
  authMiddleware,
  workspaceController.updateSettings
);

export default router;