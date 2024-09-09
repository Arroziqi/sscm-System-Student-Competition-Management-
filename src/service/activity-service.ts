import { User } from "@prisma/client";
import {
  ActivityResponse,
  CreateActivityRequest,
  toActivityResponse,
  UpdateActivityRequest,
} from "../model/activity-model";
import { Validation } from "../validation/validation";
import { ActivityValidation } from "../validation/activity-validation";
import { prismaClient } from "../application/database";
import { ActivityServiceUtil } from "./service-util";

export class ActivityService {
  static async create(
    user: User,
    request: CreateActivityRequest
  ): Promise<ActivityResponse> {
    // TODO: Validate request
    const createRequest = Validation.validate(
      ActivityValidation.CREATE,
      request
    );

    // TODO: Add username
    const data = {
      ...createRequest,
      ...{ username: user.username },
    };

    // TODO: Create Activity
    const activity = await prismaClient.activity.create({
      data: data,
    });

    // TODO: Convert Activity to ActivityResponse
    return toActivityResponse(activity);
  }

  static async get(user: User, id: number): Promise<ActivityResponse> {
    // TODO: Get Activity
    const activity = await ActivityServiceUtil.checkActivityExistence(
      id,
      user.username
    );

    // TODO: Convert Activity to ActivityResponse
    return toActivityResponse(activity!);
  }

  static async update(
    user: User,
    request: UpdateActivityRequest
  ): Promise<ActivityResponse> {
    // TODO: Validate request
    const updateRequest = Validation.validate(
      ActivityValidation.UPDATE,
      request
    );

    // TODO: Check Activity existence
    await ActivityServiceUtil.checkActivityExistence(request.id, user.username);

    // TODO: Update Activity
    const updatedActivity = await prismaClient.activity.update({
      where: {
        id: request.id,
        username: user.username,
      },
      data: updateRequest,
    });

    // TODO: Convert Activity to ActivityResponse
    return toActivityResponse(updatedActivity);
  }

  static async remove(user: User, id: number): Promise<ActivityResponse> {
    // TODO: Check Activity existence
    const activity = await ActivityServiceUtil.checkActivityExistence(
      id,
      user.username
    );

    // TODO: Remove Activity
    const removedActivity = await prismaClient.activity.delete({
      where: {
        id: id,
        username: user.username,
      },
    });

    // TODO: Convert Activity to ActivityResponse
    return toActivityResponse(removedActivity);
  }

  static async list(user: User): Promise<Array<ActivityResponse>> {
    const activities = await prismaClient.activity.findMany({
      where: {
        username: user.username,
      },
    });

    return Promise.all(
      activities.map((activity) => toActivityResponse(activity))
    );
  }
}
