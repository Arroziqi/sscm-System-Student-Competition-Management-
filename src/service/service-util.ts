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