import { User } from "@prisma/client";
import { CompetitionResponse, CreateCompetitionRequest, toCompetitionResponse } from "../model/competition-model";
import { CompetitionValidation } from "../validation/competition-validation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import { logger } from "../application/logging";

export class CompetitionService {
  static async create(user: User, request: CreateCompetitionRequest): Promise<CompetitionResponse> {
    // TODO: Validate request
    const createRequest = Validation.validate(CompetitionValidation.CREATE, request);

    // TODO: Add username
    const data = {
      ...createRequest,
      ...{username: user.username}
    }

    // TODO: Create Competition
    const competition = await prismaClient.competition.create({
      data: data
    })

    logger.debug("record : " + JSON.stringify(competition))
    // TODO: Convert Competition to CompetitionResponse
    return toCompetitionResponse(competition);
  }

  
}