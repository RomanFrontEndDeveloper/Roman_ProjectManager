import { AuthRepository } from '../repository/AuthRepository.js';
import type { RegisterDto } from '../dto/RegisterDto.js';
import bcrypt from 'bcrypt';
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

		return user;
	}

	async findUserByEmail(email: string) {
		return this.authRepository.findByEmail(email);
	}

	async createUser(data: { name: string; email: string; password: string }) {
		return this.authRepository.create(data);
	}
}
