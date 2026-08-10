import multer from 'multer';

const storage = multer.diskStorage({
	destination: 'uploads/',
	filename: (_, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

export const uploadAvatar = multer({
	storage,
	limits: {
		fileSize: 5 * 1024 * 1024, // 5 MB
	},
});
