import { NextFunction, Response } from "express";
import { UserRequest } from "../type/user-request";
import {
  CreateExperienceRequest,
  UpdateExperienceRequest,
} from "../model/experience-model";
import { ExperienceService } from "../service/experience-service";

export class ExperienceController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      // TODO: Convert string to date
      req.body.start_date = new Date(req.body.start_date as string);
      req.body.end_date = new Date(req.body.end_date as string);

      // TODO: Create request
      const request: CreateExperienceRequest =
        req.body as CreateExperienceRequest;

      // TODO: Call for Response
      const response = await ExperienceService.create(req.user!, request);

      // TODO: Send Response
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      // TODO: Get experience id
      const experienceId = Number(req.params.experienceId);

      // TODO: Call for Response
      const response = await ExperienceService.get(req.user!, experienceId);

      // TODO: Send Response
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      // TODO: Convert string to date
      req.body.start_date = new Date(req.body.start_date as string);
      req.body.end_date = new Date(req.body.end_date as string);

      // TODO: Create request
      const request: UpdateExperienceRequest =
        req.body as UpdateExperienceRequest;

      // TODO: Get experience id
      request.id = Number(req.params.experienceId);

      // TODO: Call for Response
      const response = await ExperienceService.update(
        req.user!,
        request
      );

      // TODO: Send Response
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async remove(req: UserRequest, res: Response, next: NextFunction) {
    try {
      // TODO: Get experience id
      const experienceId = Number(req.params.experienceId);

      // TODO: Call for Response
      const response = await ExperienceService.remove(req.user!, experienceId);

      // TODO: Send Response
      res.status(200).json({
        data: "OK",
      });
    } catch (e) {
      next(e);
    }
  }

  static async list(user: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await ExperienceService.list(user.user!);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
}
