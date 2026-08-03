import { AuthService } from '../services/AuthService.js';

export class AuthController {
	private authService = new AuthService();

	public register() {
		this.authService.register();
	}

	public login() {
		this.authService.login();
	}
}
