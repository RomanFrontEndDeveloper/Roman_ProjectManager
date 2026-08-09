import { Schema, model } from 'mongoose';

interface IUser {
	name: string;
	email: string;
	password: string;

	avatar: string;
	bio: string;
	phone: string;
	location: string;
	website: string;

	role: 'user' | 'admin';

	isVerified: boolean;
	verificationToken?: string;

	passwordResetToken?: string;
	passwordResetExpires?: Date;
}

const userSchema = new Schema<IUser>(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},

		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},

		password: {
			type: String,
			required: true,
		},

		avatar: {
			type: String,
			default: '',
		},

		role: {
			type: String,
			enum: ['user', 'admin'],
			default: 'user',
		},

		isVerified: {
			type: Boolean,
			default: false,
		},

		verificationToken: {
			type: String,
			default: null,
		},

		passwordResetToken: {
			type: String,
		},

		passwordResetExpires: {
			type: Date,
		},

		bio: {
			type: String,
			default: '',
			trim: true,
		},

		phone: {
			type: String,
			default: '',
			trim: true,
		},

		location: {
			type: String,
			default: '',
			trim: true,
		},

		website: {
			type: String,
			default: '',
			trim: true,
		},
	},
	{
		timestamps: true, // createdAt updatedAt
	},
);

export const UserModel = model<IUser>('User', userSchema);

// Створи модель UserModel на основі схеми userSchema. Вона буде працювати з колекцією
// users у MongoDB, а всі документи цієї моделі повинні відповідати інтерфейсу IUser.

// Schema описує структуру документа.
// Model використовується для роботи з колекцією MongoDB.
// Interface IUser потрібен TypeScript для перевірки типів.
// timestamps: true автоматично додає createdAt і updatedAt.
// Поле role краще обмежувати через enum.
// Email зазвичай роблять unique, а пароль зберігають лише у вигляді хешу.
