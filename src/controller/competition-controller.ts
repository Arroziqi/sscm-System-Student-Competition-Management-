import {
  CreateCompetitionRequest,
  SearchCompetitionRequest,
  UpdateCompetitionRequest,
} from "../model/competition-model";
import { NextFunction, Response } from "express";
import { CompetitionService } from "../service/competition-service";
import { UserRequest } from "../type/user-request";
import { Category, Predicate, Region } from "@prisma/client";

export class CompetitionController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      // TODO: Create request
      const request: CreateCompetitionRequest =
        req.body as CreateCompetitionRequest;

      // TODO: Call for Response
      const response = await CompetitionService.create(req.user!, request);

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
      // TODO: Get competition id
      const competitionId = Number(req.params.competitionId);

      // TODO: Call for Response
      const response = await CompetitionService.get(req.user!, competitionId);

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
      // TODO: Create request
      const request: UpdateCompetitionRequest =
        req.body as UpdateCompetitionRequest;

      request.id = Number(req.params.competitionId);

      // TODO: Call for Response
      const response = await CompetitionService.update(req.user!, request);

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
      const competitionId = Number(req.params.competitionId);

      // TODO: Call for Response
      const response = await CompetitionService.remove(
        req.user!,
        competitionId
      );

      // TODO: Send Response
      res.status(200).json({
        data: "OK",
      });
    } catch (e) {
      next(e);
    }
  }
  static async search(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: SearchCompetitionRequest = {
        name: req.query.name as string,
        year: req.query.year ? new Date(req.query.year as string) : undefined,
        region: (req.query.region as Region) || undefined,
        category: (req.query.category as Category) || undefined,
        predicate: (req.query.predicate as Predicate) || undefined,
        page: req.query.page ? Number(req.query.page) : 1,
        size: req.query.size ? Number(req.query.size) : 10,
      };

      // TODO: Call for Response
      const response = await CompetitionService.search(req.user!, request);

      // TODO: Send Response
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }
}
