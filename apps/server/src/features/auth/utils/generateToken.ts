import jwt from 'jsonwebtoken';
import { env } from '../../../config/env.js';

export const generateToken = (userId: string) => {
	return jwt.sign( // створює JWT і повертає його як рядок.
		{
			id: userId,
		},
		env.JWT_SECRET, //Цей секрет використовується для підпису JWT.
                        // Сервер ставить на токен свій криптографічний 
						// «підпис», щоб потім можна було перевірити, 
						// що токен не підроли.
		{
			expiresIn: '1d',
		},
	);
};
