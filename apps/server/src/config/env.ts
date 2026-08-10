import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
	PORT: z.coerce.number().default(5000),
	// Візьми PORT із .env, перетвори його в число,
	//  а якщо його немає — використовуй порт 5000.
	MONGODB_URI: z.string().min(1),
	JWT_SECRET: z.string(),
	JWT_REFRESH_SECRET: z.string(),
	CLIENT_URL: z.string().url(),
	SMTP_EMAIL: z.string().email(),
	SMTP_PASSWORD: z.string().min(1),
	CLOUDINARY_CLOUD_NAME: z.string(),
	CLOUDINARY_API_KEY: z.string(),
	CLOUDINARY_API_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);
// Створи новий об'єкт env із даних process.env, але тільки після перевірки Zod.

//  process — це великий об'єкт Node.js.
//  process.env — це об'єкт, який містить усі змінні середовища.
