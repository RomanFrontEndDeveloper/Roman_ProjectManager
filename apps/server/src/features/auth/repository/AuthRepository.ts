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
}
