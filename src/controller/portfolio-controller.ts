import { NextFunction, Response } from "express";
import {
  CreatePortfolioRequest,
  UpdatePortfolioRequest,
} from "../model/portfolio-model";
import { PortfolioService } from "../service/portfolio-service";
import { UserRequest } from "../type/user-request";

export class PortfolioController {
  // TODO: Create Portfolio
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      // TODO: Create request
      const request: CreatePortfolioRequest = {
        full_name: req.body.full_name as string,
        place_of_birth: req.body.place_of_birth as string,
        date_of_birth: new Date(req.body.date_of_birth as string),
        phone_number: req.body.phone_number as string,
        domicile: req.body.domicile as string,
        summary: req.body.summary as string,
        linkedin: (req.body.linkedin as string) || undefined,
        github: (req.body.github as string) || undefined,
        instagram: (req.body.instagram as string) || undefined,
        website: (req.body.website as string) || undefined,
      };

      // TODO: Call for Response
      const response = await PortfolioService.create(req.user!, request);

      // TODO: Send Response
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  // TODO: Update Portfolio
  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      // TODO: Create request
      const request: UpdatePortfolioRequest = {
        full_name: req.body.full_name as string || undefined,
        place_of_birth: req.body.place_of_birth as string || undefined,
        date_of_birth: new Date(req.body.date_of_birth as string) || undefined,
        phone_number: req.body.phone_number as string || undefined,
        domicile: req.body.domicile as string || undefined,
        summary: req.body.summary as string || undefined,
        linkedin: (req.body.linkedin as string) || undefined,
        github: (req.body.github as string) || undefined,
        instagram: (req.body.instagram as string) || undefined,
        website: (req.body.website as string) || undefined,
      }

      // TODO: Call for Response
      const response = await PortfolioService.update(req.user!, request);

      // TODO: Send Response
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  // TODO: Get Portfolio
  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      // TODO: call for response
      const response = await PortfolioService.get(req.user!);

      // TODO: Send Response
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
}
