import { UserModel } from '../models/UserModel.js';
//js - Тому що після компіляції TypeScript Node.js
// запускає не .ts, а скомпільовані .js файли.
import type { UpdateProfileDto } from '../dto/UpdateProfileDto.js';
import type { UpdateSettingsDto } from '../dto/UpdateSettingsDto.js';

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

	public async findByIdWithPassword(id: string) {
		return UserModel.findById(id);
	}

	public async findByVerificationToken(token: string) {
		return UserModel.findOne({
			verificationToken: token,
		});
	}

	public async findByPasswordResetToken(token: string) {
		return UserModel.findOne({
			passwordResetToken: token,
		});
	}

	async updateProfile(userId: string, data: UpdateProfileDto) {
		return UserModel.findByIdAndUpdate(
			userId,
			{ $set: data }, // Зміни тільки ці поля.
			{ new: true }, // Mongoose за замовчуванням може повернути старий
			// документ, А нам потрібен уже оновлений
		);
	}

public async updateAvatar(
	userId: string,
	avatarUrl: string,
) {
	return UserModel.findByIdAndUpdate(
		userId,
		{
			avatar: avatarUrl,
		},
		{
			new: true,
		},
	).select('-password');
}

public async updateSettings(
	userId: string,
	data: UpdateSettingsDto,
) {
	return UserModel.findByIdAndUpdate(
		userId,
		{
			$set: {
				'settings.emailNotifications': data.emailNotifications,
				'settings.language': data.language,
			},
		},
		{
			new: true,
		},
	).select('-password');
}
}
