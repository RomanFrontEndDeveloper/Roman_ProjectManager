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

			const user = await this.authService.login(email, password);

			res.json({
				success: true,
				user,
			});
		} catch (error) {
			next(error);
		}
	};
}
