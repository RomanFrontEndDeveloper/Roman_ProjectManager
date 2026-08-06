import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { env } from '../config/env.js';

export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader) {
			return res.status(401).json({
				success: false,
				message: 'Unauthorized',
			});
		}

		if (!authHeader.startsWith('Bearer ')) {
			return res.status(401).json({
				success: false,
				message: 'Unauthorized',
			});
		}

		const token = authHeader.split(' ')[1];

		if (!token) {
			return res.status(401).json({
				success: false,
				message: 'Unauthorized',
			});
		}

		jwt.verify(token, env.JWT_SECRET);

		next();
	} catch {
		return res.status(401).json({
			success: false,
			message: 'Invalid token',
		});
	}
};
