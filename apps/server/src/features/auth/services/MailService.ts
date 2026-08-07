// Цей код створює та налаштовує SMTP-з'єднання з Gmail,
// через яке сервер зможе надсилати електронні листи.

import nodemailer from 'nodemailer';
import { env } from '../../../config/env.js';

export class MailService {
	// сервіс для роботи з поштою
	private transporter = nodemailer.createTransport({
		//transporter — об'єкт, який
		// відповідає за надсилання листів.
		host: 'smtp.gmail.com',
		port: 587,
		secure: false,
		auth: {
			user: env.SMTP_EMAIL,
			pass: env.SMTP_PASSWORD, //входить у Gmail за допомогою email і пароля
		},
	});

	public async sendMail({
		to,
		subject,
		html,
	}: {
		to: string;
		subject: string;
		html: string;
	}) {
		await this.transporter.sendMail({
			from: env.SMTP_EMAIL,
			to,
			subject,
			html,
		});
	}
}
