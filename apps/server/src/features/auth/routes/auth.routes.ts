import { Router } from 'express';
import { AuthController } from '../controllers/AuthController.js';
import { authMiddleware } from '../../../middlewares/authMiddleware.js';
const router = Router();

const authController = new AuthController();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refresh);

router.get('/me', authMiddleware, (_, res) => {
	res.json({
		success: true,
		message: 'You are authorized',
	});
});

export default router;
