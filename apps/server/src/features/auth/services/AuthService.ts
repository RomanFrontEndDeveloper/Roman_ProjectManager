import { AuthRepository } from '../repository/AuthRepository.js';
import type { RegisterDto } from '../dto/RegisterDto.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/generateToken.js';
import { generateRefreshToken } from '../utils/generateRefreshToken.js';
import jwt from 'jsonwebtoken';
import { env } from '../../../config/env.js';
import { MailService } from './MailService.js';
import { generateVerificationToken } from '../utils/generateVerificationToken.js';

export class AuthService {
	private authRepository = new AuthRepository();
	private mailService = new MailService();

	public async register(data: RegisterDto) {
		// Перевіряємо, чи вже існує користувач
		const existingUser = await this.authRepository.findByEmail(data.email);

		if (existingUser) {
			throw new Error('User already exists');
		}

		// Генеруємо verificationToken для підтвердження Email
		const verificationToken = generateVerificationToken();

		// Хешуємо пароль
		const hashedPassword = await bcrypt.hash(data.password, 10);

		// Створюємо користувача
		const user = await this.authRepository.create({
			...data,
			password: hashedPassword,
			verificationToken,
		});

		// Надсилаємо лист із verificationToken
		const verificationUrl = `${env.CLIENT_URL}/verify?token=${verificationToken}`;

		await this.mailService.sendMail({
			to: user.email,
			subject: 'Verify your account',
			html: `
		<h1>Welcome!</h1>

		<p>Thank you for registering.</p>

		<p>Please verify your email by clicking the link below:</p>

		<a href="${verificationUrl}">
			Verify Email
		</a>
	`,
		});

		return user;
	}

	public async verifyAccount(token: string) {
		const user = await this.authRepository.findByVerificationToken(token);

		if (!user) {
			throw new Error('Invalid verification token');
		}

		user.isVerified = true;

		user.verificationToken = undefined;

		await user.save();
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

	public async getCurrentUser(userId: string) {
		const user = await this.authRepository.findById(userId);

		if (!user) {
			throw new Error('User not found');
		}

		return user;
	}

	async findUserByEmail(email: string) {
		return this.authRepository.findByEmail(email);
	}

	async createUser(data: { name: string; email: string; password: string }) {
		return this.authRepository.create(data);
	}
}
