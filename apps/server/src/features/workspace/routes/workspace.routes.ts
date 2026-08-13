import { Router } from 'express';
import { WorkspaceController } from '../controllers/WorkspaceController.js';

const router = Router();

const workspaceController = new WorkspaceController();

router.post(
  '/',
  workspaceController.createWorkspace,
);

router.get(
  '/',
  workspaceController.getAllWorkspaces,
);

router.get(
  '/:id',
  workspaceController.getWorkspaceById,
);

router.patch(
  '/:id',
  workspaceController.updateWorkspace,
);

router.delete(
  '/:id',
  workspaceController.deleteWorkspace,
);

export default router;