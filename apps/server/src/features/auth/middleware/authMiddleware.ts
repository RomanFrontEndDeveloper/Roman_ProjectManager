import type { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { env } from '../../../config/env.js';
import type { AuthRequest } from '../types/AuthRequest.js';

export const authMiddleware = (
	req: AuthRequest,
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

		const decoded = jwt.verify(token, env.JWT_SECRET) as {
			id: string;
		};

		req.user = {
			id: decoded.id,
		};

		next();
	} catch {
		return res.status(401).json({
			success: false,
			message: 'Invalid token',
		});
	}
};
