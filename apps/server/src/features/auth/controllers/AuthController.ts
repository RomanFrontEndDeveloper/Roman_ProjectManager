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

			const { user, accessToken, refreshToken } =
				await this.authService.login(email, password);

			res.json({
				success: true,
				user,
				accessToken,
				refreshToken,
			});
			// Тобто вгорі ти отримуєш значення з об'єкта, а внизу ти відправляєш
			// ці ж самі значення клієнту у відповіді. Це не дублювання даних,
			// а дві різні операції: спочатку читання, потім відправлення.
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
			const { refreshToken } = req.body;

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
