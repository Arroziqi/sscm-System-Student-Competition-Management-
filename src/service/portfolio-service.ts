import { User } from "@prisma/client";
import {
  CreatePortfolioRequest,
  PortfolioResponse,
  toPortfolioResponse,
  UpdatePortfolioRequest,
} from "../model/portfolio-model";
import { Validation } from "../validation/validation";
import { PortfolioValidation } from "../validation/portfolio-validation";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";

export class PortfolioService {
  static async create(user: User, request: CreatePortfolioRequest) {
    // TODO: Validate request
    const createRequest = Validation.validate(
      PortfolioValidation.CREATE,
      request
    );

    // TODO: Add username
    const data = {
      ...createRequest,
      ...{ username: user.username },
    };

    // TODO: Create Portfolio
    const portfolio = await prismaClient.portfolio.create({
      data: data,
    });

    // TODO: Convert Portfolio to PortfolioResponse
    return toPortfolioResponse(portfolio);
  }

  static async get(user: User): Promise<PortfolioResponse> {
    // TODO: Get Portfolio
    const portfolio = await prismaClient.portfolio.findFirst({
      where: {
        username: user.username,
      },
    });

    if (!portfolio) {
      throw new ResponseError(404, "Portfolio not found");
    }

    // TODO: Convert Portfolio to PortfolioResponse
    return toPortfolioResponse(portfolio);
  }

  static async update(
    user: User,
    request: UpdatePortfolioRequest
  ): Promise<PortfolioResponse> {
    // TODO: Validate request
    const updateRequest = Validation.validate(
      PortfolioValidation.UPDATE,
      request
    );

    // TODO: Update Portfolio
    const updatedPortfolio = await prismaClient.portfolio.update({
      where: {
        username: user.username,
      },
      data: updateRequest,
    });

    // TODO: Convert Portfolio to PortfolioResponse
    return toPortfolioResponse(updatedPortfolio);
  }
}
