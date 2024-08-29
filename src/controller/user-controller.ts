import { Request, Response, NextFunction } from "express";
import {
  CreateUserRequest,
  LoginUserRequest,
  UpdateUserRequest,
} from "../model/user-model";
import { UserService } from "../service/user-service";
import { UserRequest } from "../type/user-request";

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      // TODO: Create Request
      const request: CreateUserRequest = req.body as CreateUserRequest;

      // TODO: Call for Resonse
      const response = await UserService.register(request);

      // TODO: Send Response
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      // TODO: Create Request
      const request: LoginUserRequest = req.body as LoginUserRequest;

      // TODO: Call for Resonse
      const response = await UserService.login(request);

      // TODO: Send Response
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
  // TODO: Get user
  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      // TODO: Call for Resonse
      const response = await UserService.get(req.user!);

      // TODO: Send Response
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  // TODO: Update user
  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      // TODO: Create Request
      const request: UpdateUserRequest = req.body as UpdateUserRequest;

      // TODO: Call for Resonse
      const response = await UserService.update(req.user!, request);

      // TODO: Send Response
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  // TODO: Logout user
  static async logout(req: UserRequest, res: Response, next: NextFunction) {
    try {
      // TODO: Call for Resonse
      const response = await UserService.logout(req.user!);

      // TODO: Send Response
      res.status(200).json({
        data: "OK",
      });
    } catch (e) {
      next(e);
    }
  }
}
