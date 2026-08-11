import cloudinary from '../../../config/cloudinary.js';

export class CloudinaryService {
	public async uploadAvatar(file: Buffer): Promise<string> {
		const result = await new Promise<any>((resolve, reject) => {
			const stream = cloudinary.uploader.upload_stream(
				{
					folder: 'roman-project-manager/avatars',
					resource_type: 'image',
				},
				(error, result) => {
					if (error) {
						reject(error);
					} else {
						resolve(result);
					}
				},
			);

			stream.end(file);
		});

		return result.secure_url;
	}
}