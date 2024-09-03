import {
  CreateExperienceRequest,
  ExperienceResponse,
  toExperienceResponse,
  UpdateExperienceRequest,
} from "../model/experience-model";
import { ExperienceValidation } from "../validation/experience-validation";
import { Validation } from "../validation/validation";
import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ExperienceServiceUtil } from "./service-util";

export class ExperienceService {
  static async create(
    user: User,
    request: CreateExperienceRequest
  ): Promise<ExperienceResponse> {
    // TODO: Validate request
    const createRequest = Validation.validate(
      ExperienceValidation.CREATE,
      request
    );

    // TODO: Add username
    const data = {
      ...createRequest,
      ...{ username: user.username },
    };

    // TODO: Create Experience
    const experience = await prismaClient.experience.create({
      data: data,
    });

    // TODO: Convert Experience to ExperienceResponse
    return toExperienceResponse(experience);
  }

  static async get(user: User, id: number): Promise<ExperienceResponse> {
    // TODO: Get Experience
    const experience = await ExperienceServiceUtil.checkExperienceExistence(
      id,
      user.username
    );

    // TODO: Convert Experience to ExperienceResponse
    return toExperienceResponse(experience!);
  }

  static async update(
    user: User,
    request: UpdateExperienceRequest,
  ): Promise<ExperienceResponse> {
    // TODO: Validate request
    const updateRequest = Validation.validate(
      ExperienceValidation.UPDATE,
      request
    );

    // TODO: Check Experience existence
    await ExperienceServiceUtil.checkExperienceExistence(
      request.id,
      user.username
    );

    // TODO: Update Experience
    const updatedExperience = await prismaClient.experience.update({
      where: {
        id: request.id,
        username: user.username,
      },
      data: updateRequest,
    });

    // TODO: Convert Experience to ExperienceResponse
    return toExperienceResponse(updatedExperience);
  }

  static async remove(user: User, id: number): Promise<ExperienceResponse> {
    // TODO: Check Experience existence
    const experience = await ExperienceServiceUtil.checkExperienceExistence(
      id,
      user.username
    );

    // TODO: Remove Experience
    const removedExperience = await prismaClient.experience.delete({
      where: {
        id: id,
        username: user.username,
      },
    });

    // TODO: Convert Experience to ExperienceResponse
    return toExperienceResponse(removedExperience);
  }

  static async list(user: User): Promise<Array<ExperienceResponse>> {
    const experiences = await prismaClient.experience.findMany({
      where: {
        username: user.username,
      },
    });

    return experiences.map((experience) => toExperienceResponse(experience));
  }
}
