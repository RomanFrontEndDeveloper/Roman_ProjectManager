import jwt from 'jsonwebtoken';
import { env } from '../../../config/env.js';

export const generateRefreshToken = (userId: string) => {
	return jwt.sign(
		{
			id: userId,
		},
		env.JWT_REFRESH_SECRET,
		{
			expiresIn: '7d',
		},
	);
};
