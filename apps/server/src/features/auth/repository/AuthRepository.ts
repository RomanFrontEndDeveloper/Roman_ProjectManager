import { UserModel } from '../models/UserModel.js';
//js - Тому що після компіляції TypeScript Node.js
// запускає не .ts, а скомпільовані .js файли.
import type { UpdateProfileDto } from '../dto/UpdateProfileDto.js';
import type { UpdateSettingsDto } from '../dto/UpdateSettingsDto.js';
import type { UpdatePreferencesDto } from '../dto/UpdatePreferencesDto.js';


export class AuthRepository {
	public async create(userData: any) {
		return await UserModel.create(userData); //register
	}

	public async findByEmail(email: string) { // /forgot-password
		return await UserModel.findOne({ email }); //login
	}

	public async findById(id: string) {  //me
		return UserModel.findById(id).select('-password');
		// .select('-password') -> НЕ повертати пароль.
	}

	public async findByIdWithPassword(id: string) {
		return UserModel.findById(id);
	}

	public async findByVerificationToken(token: string) {  //verify
		return UserModel.findOne({
			verificationToken: token,
		});
	}

	public async findByPasswordResetToken(token: string) { // /reset-password
		return UserModel.findOne({
			passwordResetToken: token,
		});
	}
	
    // /profile
	async updateProfile(userId: string, data: UpdateProfileDto) {
		return UserModel.findByIdAndUpdate(
			userId,
			{ $set: data }, // Зміни тільки ці поля.
			{ new: true }, // Mongoose за замовчуванням може повернути старий
			// документ, А нам потрібен уже оновлений
		);
	}
// 	UserModel.findByIdAndUpdate(
//                                id,
//                        updateData,
//                           options
//                              );


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
	// Знайди користувача по id, онови поле avatar, 
	// поверни оновленого користувача без пароля.

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

    public async updatePreferences(
	userId: string,
	data: UpdatePreferencesDto,
   ) {
	return UserModel.findByIdAndUpdate(
		userId,
		{
			$set: {
				'preferences.timezone': data.timezone,
				'preferences.dateFormat': data.dateFormat,
				'preferences.startOfWeek': data.startOfWeek,
			},
		},
		{
			new: true,
		},
	).select('-password');
    }
}
