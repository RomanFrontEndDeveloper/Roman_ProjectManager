import { Router } from "express";
import { authMiddleware } from "../../auth/middleware/authMiddleware.js";
import { WorkspaceInviteController } from "../controllers/WorkspaceMemberController.js";

const router = Router();

const controller =
  new WorkspaceInviteController();

router.post(
  "/:workspaceId/invite",
  authMiddleware,
  controller.createInvite
);

router.post(
  "/join/:token",
  authMiddleware,
  controller.joinWorkspace
);

export default router;