import { Router } from 'express';
import { AuthController } from '../controllers/AuthController.js';

const router = Router();

const authController = new AuthController();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refresh);

export default router;
