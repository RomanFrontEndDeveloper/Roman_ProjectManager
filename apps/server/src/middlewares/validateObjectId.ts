import mongoose from 'mongoose';
import type { NextFunction, Request, Response } from 'express';

export const validateObjectId = (
	// Його задача — перевіряти, чи є параметр :id коректним MongoDB ObjectId.
	req: Request<{ id: string }>,
	res: Response,
	next: NextFunction,
) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		// Це офіційний спосіб перевірки ObjectId у Mongoose.
		// Він повертає: true або false
		return res.status(400).json({
			success: false,
			message: 'Invalid ObjectId',
		});
	}

	next();
};

// його потрібно використовувати?
// Лише там, де є: id
