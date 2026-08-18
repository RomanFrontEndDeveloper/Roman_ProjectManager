import { Router } from "express";

import { authMiddleware } from "../../auth/middleware/authMiddleware.js";
import { ProjectController } from "../controllers/ProjectController.js";

const router = Router();

const projectController = new ProjectController();

router.post("/", authMiddleware, projectController.create);

router.get("/search", authMiddleware, projectController.search);
// GET /api/projects/search?search=roman

router.get("/", authMiddleware, projectController.findAll);

router.get("/filter", authMiddleware, projectController.filterByStatus);

router.get("/sort", authMiddleware, projectController.sort);
router.post("/:id/members", authMiddleware, projectController.addMember);

//id routes
router.get("/:id", authMiddleware, projectController.findById);

router.patch("/:id", authMiddleware, projectController.update);

router.delete("/:id", authMiddleware, projectController.delete);

export default router;

// Express перевіряє роуты зверху вниз, тому /:id має бути після /search і /filter, інакше він перехопить їх як id.
