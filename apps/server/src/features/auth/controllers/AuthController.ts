import type { Request, Response, NextFunction } from 'express';
import type { RegisterDto } from '../dto/RegisterDto.js';
import { AuthService } from '../services/AuthService.js';

export class AuthController {
	private authService = new AuthService();

	public async register(req: Request, res: Response) {
		const data: RegisterDto = req.body;

		const user = await this.authService.register(data);

		res.status(201).json(user);
	}

	public login = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { email, password } = req.body;

			// Отримуємо з AuthService користувача та згенеровані токени.
			const { user, accessToken, refreshToken } =
				await this.authService.login(email, password);

			// Зберігаємо refreshToken в HttpOnly cookie,
			// щоб браузер автоматично надсилав його при наступних запитах.
			res.cookie('refreshToken', refreshToken, {
				httpOnly: true,
				secure: false, // true у production
				sameSite: 'lax', // Захищає від більшості CSRF-атак,
				// обмежуючи надсилання cookie між сайтами.
				maxAge: 7 * 24 * 60 * 60 * 1000,
			});

			// Відправляємо клієнту дані користувача та accessToken.
			// refreshToken не повертаємо в JSON, оскільки він уже збережений у cookie.
			res.json({
				success: true,
				user,
				accessToken,
			});
		} catch (error) {
			next(error);
		}
	};
	public refresh = async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const refreshToken = req.cookies.refreshToken;

			const accessToken = await this.authService.refresh(refreshToken);

			res.json({
				success: true,
				accessToken,
			});
		} catch (error) {
			next(error);
		}
	};
}
