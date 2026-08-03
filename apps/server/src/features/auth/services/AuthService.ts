import { AuthRepository } from '../repository/AuthRepository.js';

export class AuthService {
	private authRepository = new AuthRepository();

	public register() {
		console.log('Business logic...');

		this.authRepository.createUser();
	}

	public login() {
		this.authRepository.findUserByEmail();
	}
}
