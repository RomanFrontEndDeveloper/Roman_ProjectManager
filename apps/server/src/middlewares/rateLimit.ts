import { rateLimit } from 'express-rate-limit';

export const globalRateLimit = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 хвилин

	max: 100,

	message: {
		success: false,
		message: 'Too many requests. Please try again later.',
	},

	standardHeaders: true, //Express додасть сучасні HTTP-заголовки, які показують інформацію про ліміти.

	legacyHeaders: false, //Старі заголовки не потрібні.
});
