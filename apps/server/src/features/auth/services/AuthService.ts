import { AuthRepository } from '../repository/AuthRepository.js';
import type { RegisterDto } from '../dto/RegisterDto.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/generateToken.js';
import { generateRefreshToken } from '../utils/generateRefreshToken.js';
import jwt from 'jsonwebtoken';
import { env } from '../../../config/env.js';
export class AuthService {
	private authRepository = new AuthRepository();

	async register(data: RegisterDto) {
		const existingUser = await this.authRepository.findByEmail(data.email);

		if (existingUser) {
			throw new Error('User already exists');
		}

		const hashedPassword = await bcrypt.hash(data.password, 10);

		return this.authRepository.create({
			...data,
			password: hashedPassword,
		});
	}

	public async login(email: string, password: string) {
		const user = await this.authRepository.findByEmail(email);

		if (!user) {
			throw new Error('Invalid email or password');
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password);

		if (!isPasswordCorrect) {
			throw new Error('Invalid email or password');
		}

		const accessToken = generateToken(user._id.toString());

		const refreshToken = generateRefreshToken(user._id.toString());

		return {
			user,
			accessToken,
			refreshToken,
		};
	}

	public async refresh(refreshToken: string) {
		const payload = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as {
			id: string;
		};
		// Перевіряє: чи токен справжній;
		// чи підписаний правильним секретним ключем (JWT_REFRESH_SECRET);
		// чи не закінчився його термін дії.

		const accessToken = generateToken(payload.id);
		// Тут створюється новий Access Token.

		return accessToken;
	}
	// 	Метод повертає новий Access Token.
	// Потім Controller відправить його клієнту:

	async findUserByEmail(email: string) {
		return this.authRepository.findByEmail(email);
	}

	async createUser(data: { name: string; email: string; password: string }) {
		return this.authRepository.create(data);
	}
}
