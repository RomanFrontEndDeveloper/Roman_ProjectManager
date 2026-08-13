import { Router } from 'express';
import { AuthController } from '../controllers/AuthController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { MailService } from '../services/MailService.js';
import { env } from '../../../config/env.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = Router();

const authController = new AuthController();
const mailService = new MailService();

router.post('/register', authController.register);

router.post('/login', authController.login);
//
router.post('/logout', authController.logout);

router.post('/refresh', authController.refresh);
// дозволяє отримати новий accessToken, використовуючи refreshtoken, який зберігається в HttpOnly cookie.

router.get('/me', authMiddleware, authController.me);
// router.get('/me' Він дозволяє вже авторизованому
// користувачу отримати свої дані, не передаючи id у запиті.
// поверне user, який зберігається в req.user, після того як authMiddleware перевірить токен.

router.get('/verify', authController.verify);

router.post('/forgot-password', authController.forgotPassword);// доззволяє користувачу отримати посилання для скидання пароля на email.

router.post('/reset-password', authController.resetPassword); // дозволяє користувачу скинути пароль, використовуючи токен, який він отримав на email

router.patch('/change-password', authMiddleware, authController.changePassword);// дозволяє авторизованому користувачу змінити свій пароль, використовуючи поточний пароль для підтвердження.

// authMiddleware не передає дані в AuthController через import.
//  Вони з'єднані через Express middleware chain.
router.patch('/profile', authMiddleware, authController.updateProfile);// дозволяє авторизованому користувачу оновити свої дані профілю (ім'я, email тощо).

router.get('/test-email', async (_, res) => {
	await mailService.sendMail({
		to: 'roman168234@gmail.com',
		subject: 'Roman Project Manager',
		html: '<h1>Вітаю</h1>',
	});// Використовуємо MailService для відправки тестового листа.

	res.json({// Відповідаємо клієнту, що лист відправлено.
		success: true,
		message: 'Email sent',
	});
});

router.patch(
	'/profile/avatar',
	authMiddleware,
	upload.single('avatar'), // Multer шукає файл у полі: <input name="avatar" />
	// і записує його в: req.file
	authController.updateAvatar,
);// дозволяє авторизованому користувачу оновити свій аватар, використовуючи middleware для обробки завантаження файлу.

router.patch(
	'/settings',
	authMiddleware,
	authController.updateSettings,
);// дозволяє авторизованому користувачу оновити свої налаштування профілю.

router.patch(
	'/preferences',
	authMiddleware,
	authController.updatePreferences,
);// дозволяє авторизованому користувачу оновити свої переваги (preferences) профілю.

export default router;
