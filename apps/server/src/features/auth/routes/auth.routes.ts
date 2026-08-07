import { Router } from 'express';
import { AuthController } from '../controllers/AuthController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { MailService } from '../services/MailService.js';
import { env } from '../../../config/env.js';
const router = Router();

const authController = new AuthController();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/refresh', authController.refresh);
router.get('/me', authMiddleware, authController.me);
// router.get('/me' Він дозволяє вже авторизованому
// користувачу отримати свої дані, не передаючи id у запиті.

const mailService = new MailService();

router.get('/test-email', async (_, res) => {
	await mailService.sendMail({
		to: 'romariotraveler@gmail.com',
		subject: 'Roman Project Manager',
		html: '<h1>Вітаю</h1>',
	});

	res.json({
		success: true,
		message: 'Email sent',
	});
});

export default router;
