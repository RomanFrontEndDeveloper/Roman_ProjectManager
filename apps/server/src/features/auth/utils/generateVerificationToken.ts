import crypto from 'crypto';
// (генерації випадкових чисел; хешування;
// шифрування;створення токенів.)

export const generateVerificationToken = () => {
	return crypto.randomBytes(32).toString('hex');
};
