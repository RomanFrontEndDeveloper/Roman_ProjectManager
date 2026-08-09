import { Router } from 'express';
import { AuthController } from '../controllers/AuthController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { MailService } from '../services/MailService.js';
import { env } from '../../../config/env.js';

const router = Router();

const authController = new AuthController();

router.post('/register', authController.register);
router.post('/login', authController.login);
//
router.post('/logout', authController.logout);
router.post('/refresh', authController.refresh);
router.get('/me', authMiddleware, authController.me);
// router.get('/me' Він дозволяє вже авторизованому
// користувачу отримати свої дані, не передаючи id у запиті.
router.get('/verify', authController.verify);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.patch('/change-password', authMiddleware, authController.changePassword);
router.patch('/profile', authMiddleware, authController.updateProfile);

const mailService = new MailService();

router.get('/test-email', async (_, res) => {
	await mailService.sendMail({
		to: 'roman168234@gmail.com',
		subject: 'Roman Project Manager',
		html: '<h1>Вітаю</h1>',
	});

	res.json({
		success: true,
		message: 'Email sent',
	});
});

export default router;
