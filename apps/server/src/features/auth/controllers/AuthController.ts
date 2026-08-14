import type {
  Request,
  Response,
  NextFunction,
} from "express";

import type { RegisterDto } from "../dto/RegisterDto.js";
import { AuthService } from "../services/AuthService.js";

export class AuthController {
  private authService = new AuthService();

  public register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data: RegisterDto = req.body;

      const user = await this.authService.register(
        data
      );

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  };

  public verify = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { token } = req.query;

      if (typeof token !== "string") {
        throw new Error(
          "Verification token is required"
        );
      }

      await this.authService.verifyAccount(
        token
      );

      res.json({
        success: true,
        message:
          "Account verified successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  public login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, password } = req.body;

      const {
        user,
        accessToken,
        refreshToken,
      } = await this.authService.login(
        email,
        password
      );

      res.cookie(
        "refreshToken",
        refreshToken,
        {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          maxAge:
            7 * 24 * 60 * 60 * 1000,
        }
      );

      res.json({
        success: true,
        user,
        accessToken,
      });
    } catch (error) {
      next(error);
    }
  };

  public logout = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      res.clearCookie(
        "refreshToken",
        {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
        }
      );

      res.json({
        success: true,
        message: "Logged out",
      });
    } catch (error) {
      next(error);
    }
  };

  public refresh = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const refreshToken =
        req.cookies.refreshToken;

      const accessToken =
        await this.authService.refresh(
          refreshToken
        );

      res.json({
        success: true,
        accessToken,
      });
    } catch (error) {
      next(error);
    }
  };

  public me = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user =
        await this.authService.getCurrentUser(
          req.user.id
        );

      res.json({
        success: true,
        user,
      });
    } catch (error) {
      next(error);
    }
  };

  public forgotPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email } = req.body;

      const resetToken =
        await this.authService.forgotPassword(
          email
        );

      res.json({
        success: true,
        message:
          "Password reset email sent",
        resetToken,
      });
    } catch (error) {
      next(error);
    }
  };

  public resetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { token, newPassword } =
        req.body;

      await this.authService.resetPassword(
        token,
        newPassword
      );

      res.json({
        success: true,
        message:
          "Password reset successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  public changePassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const {
        currentPassword,
        newPassword,
      } = req.body;

      await this.authService.changePassword(
        req.user.id,
        currentPassword,
        newPassword
      );

      res.json({
        success: true,
        message:
          "Password changed successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  public updateProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        throw new Error(
          "Unauthorized"
        );
      }

      const user =
        await this.authService.updateProfile(
          userId,
          req.body
        );

      res.json({
        success: true,
        user,
      });
    } catch (error) {
      next(error);
    }
  };

  public updateAvatar = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        throw new Error(
          "Unauthorized"
        );
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message:
            "Avatar is required",
        });
      }

      const user =
        await this.authService.updateAvatar(
          userId,
          req.file.buffer
        );

      res.json({
        success: true,
        user,
      });
    } catch (error) {
      next(error);
    }
  };

  public updateSettings = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        throw new Error(
          "Unauthorized"
        );
      }

      const user =
        await this.authService.updateSettings(
          userId,
          req.body
        );

      res.json({
        success: true,
        user,
      });
    } catch (error) {
      next(error);
    }
  };

  public updatePreferences = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        throw new Error(
          "Unauthorized"
        );
      }

      const user =
        await this.authService.updatePreferences(
          userId,
          req.body
        );

      res.json({
        success: true,
        user,
      });
    } catch (error) {
      next(error);
    }
  };
}