import { v2 as cloudinary } from 'cloudinary';
import { env } from './env.js';

cloudinary.config({ // Тут відбувається "логін" сервера в Cloudinary
	cloud_name: env.CLOUDINARY_CLOUD_NAME,
	api_key: env.CLOUDINARY_API_KEY,
	api_secret: env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
