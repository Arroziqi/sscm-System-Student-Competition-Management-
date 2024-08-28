import { Request, Response, NextFunction } from "express";
import { CreateUserRequest, LoginUserRequest } from "../model/user-model";
import { UserService } from "../service/user-service";

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
}
