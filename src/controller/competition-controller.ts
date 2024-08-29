import { CreateCompetitionRequest } from "../model/competition-model";
import { NextFunction, Response } from "express";
import { CompetitionService } from "../service/competition-service";
import { UserRequest } from "../type/user-request";
import { logger } from "../application/logging";
import { date } from "zod";

export class CompetitionController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      // TODO: Create request
      const request: CreateCompetitionRequest =
        req.body as CreateCompetitionRequest;

      // TODO: Call for Response
      const response = await CompetitionService.create(req.user!, request);

      logger.debug("response : " + JSON.stringify(response));

      // TODO: Send Response
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
}
