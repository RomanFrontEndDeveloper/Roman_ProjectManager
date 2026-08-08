import { UserModel } from '../models/UserModel.js';
//js - Тому що після компіляції TypeScript Node.js
// запускає не .ts, а скомпільовані .js файли.

export class AuthRepository {
	public async create(userData: any) {
		return await UserModel.create(userData);
	}

	public async findByEmail(email: string) {
		return await UserModel.findOne({ email });
	}

	public async findById(id: string) {
		return UserModel.findById(id).select('-password');
		// .select('-password') -> НЕ повертати пароль.
	}

	public async findByVerificationToken(token: string) {
		return UserModel.findOne({
			verificationToken: token,
		});
	}
}
