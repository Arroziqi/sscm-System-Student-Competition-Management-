import { NextFunction, Response } from "express";
import { UserRequest } from "../type/user-request";
import {
  CreateActivityRequest,
  UpdateActivityRequest,
} from "../model/activity-model";
import { ActivityService } from "../service/activity-service";

export class ActivityController {
  // TODO: Implement ActivityController
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      // TODO: Convert string to date
      req.body.start_date = new Date(req.body.start_date as string);
      req.body.end_date = new Date(req.body.end_date as string);

      // TODO: Create request
      const request: CreateActivityRequest = req.body as CreateActivityRequest;

      // TODO: Call for Response
      const response = await ActivityService.create(req.user!, request);

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
      // TODO: Get activity id
      const activityId = Number(req.params.activityId);

      // TODO: Call for Response
      const response = await ActivityService.get(req.user!, activityId);

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
      const request: UpdateActivityRequest = req.body as UpdateActivityRequest;

      // TODO: Get activity id
      request.id = Number(req.params.activityId);

      // TODO: Call for Response
      const response = await ActivityService.update(req.user!, request);

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
      // TODO: Get activity id
      const activityId = Number(req.params.activityId);

      // TODO: Call for Response
      const response = await ActivityService.remove(req.user!, activityId);

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
      const response = await ActivityService.list(user.user!);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
}
