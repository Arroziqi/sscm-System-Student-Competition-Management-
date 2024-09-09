import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";

export class CompetitionServiceUtil {
  static async checkCompetitionExistence(id: number, username: string) {
    const competition = await prismaClient.competition.findFirst({
      where: { id: id, username: username }
    })

    if(!competition){
      throw new ResponseError(404, "Competition not found");
    }

    return competition;
  }

}

export class ExperienceServiceUtil {
  static async checkExperienceExistence(id: number, username: string) {
    const experience = await prismaClient.experience.findFirst({
      where: { id: id, username: username }
    })

    if(!experience){
      throw new ResponseError(404, "Experience not found");
    }

    return experience;
  }
}

export class ActivityServiceUtil {
  static async checkActivityExistence(id: number, username: string) {
    const activity = await prismaClient.activity.findFirst({
      where: { id: id, username: username }
    })

    if(!activity){
      throw new ResponseError(404, "Activity not found");
    }

    return activity;
  }
}