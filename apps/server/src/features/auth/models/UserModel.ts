import { Schema, model } from 'mongoose';

interface IUser {
	name: string;
	email: string;
	password: string;
	avatar: string;
	role: 'user' | 'admin';
	isVerified: boolean;
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
	},
	{
		timestamps: true,
	},
);

export const UserModel = model<IUser>('User', userSchema);
// Створи модель UserModel на основі схеми userSchema, яка буде працювати з колекцією
//users у MongoDB і через яку можна створювати, шукати, оновлювати та видаляти документи.

// Schema описує структуру документа.
// Model використовується для роботи з колекцією MongoDB.
// Interface IUser потрібен TypeScript для перевірки типів.
// timestamps: true автоматично додає createdAt і updatedAt.
// Поле role краще обмежувати через enum.
// Email зазвичай роблять unique, а пароль зберігають лише у вигляді хешу.
