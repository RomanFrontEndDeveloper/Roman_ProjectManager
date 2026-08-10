import cloudinary from '../../../config/cloudinary.js';

export class CloudinaryService {
	public async uploadAvatar(filePath: string) {
		const result = await cloudinary.uploader.upload(filePath, {
			folder: 'freelancehub/avatars',
			resource_type: 'image',
		});

		return result.secure_url;
	}
}
