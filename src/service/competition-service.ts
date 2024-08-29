import { User } from "@prisma/client";
import { CompetitionResponse, CreateCompetitionRequest, SearchCompetitionRequest, toCompetitionResponse, UpdateCompetitionRequest } from "../model/competition-model";
import { CompetitionValidation } from "../validation/competition-validation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import { logger } from "../application/logging";
import { ResponseError } from "../error/response-error";
import { CompetitionServiceUtil } from "./service-util";
import { PageAble } from "../model/page";

export class CompetitionService {
  static async create(user: User, request: CreateCompetitionRequest): Promise<CompetitionResponse> {
    // TODO: Parse year to Date
    request.year = new Date(request.year)

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

  static async get(user: User, id: number): Promise<CompetitionResponse> {
    // TODO: Get Competition
    const competition = await CompetitionServiceUtil.checkCompetitionExistence(id, user.username);

    // TODO: Convert Competition to CompetitionResponse
    return toCompetitionResponse(competition!);
  }

  static async update(user: User, request: UpdateCompetitionRequest): Promise<CompetitionResponse>{
    // TODO: Parse year to Date
    if(request.year){
      request.year = new Date(request.year)
    }

    // TODO: Validate request
    const updateRequest = Validation.validate(CompetitionValidation.UPDATE, request);

    // TODO: Check Competition existence
    await CompetitionServiceUtil.checkCompetitionExistence(updateRequest.id, user.username);

    // TODO: Update Competition
    const updatedCompetition = await prismaClient.competition.update({
      where: {
        id: updateRequest.id,
        username: user.username
      },
      data: updateRequest
    })

    // TODO: Convert Competition to CompetitionResponse
    return toCompetitionResponse(updatedCompetition);
  }

  static async remove(user: User, id: number): Promise<CompetitionResponse>{
    // TODO: Check Competition existence
    const competition = await CompetitionServiceUtil.checkCompetitionExistence(id, user.username);

    // TODO: Remove Competition
    const removedCompetition = await prismaClient.competition.delete({
      where: {
        id: id,
        username: user.username
      }
    })

    // TODO: Convert Competition to CompetitionResponse
    return toCompetitionResponse(removedCompetition);
  }

  static async search(user: User, request: SearchCompetitionRequest): Promise<PageAble<CompetitionResponse>>{
    // Parse year to Date
    if (request.year) {
        const parsedYear = new Date(request.year);
        if (isNaN(parsedYear.getTime())) { // Cek jika date tidak valid
            console.log('Invalid Date:', request.year);
            throw new Error('Invalid date format');
        }
        request.year = parsedYear;
    }
    console.log("year : " + typeof(request.year), request.year)
    // TODO: Validate request
    const searchRequest = Validation.validate(CompetitionValidation.SEARCH, request);

    // TODO: Count number of 
    const skip = (searchRequest.page - 1) * searchRequest.size

    // TODO: Create filter array
    const filter = []

    // TODO: Search Competition with dynamic query
    // TODO: Check if name exist
    if(searchRequest.name){
      filter.push({
        name: {
          contains: searchRequest.name
        }
      })
    }
    // TODO: Check if year exist
    if(searchRequest.year){
      filter.push({
        year: {
          equals: searchRequest.year
        }
      })
    }
    // TODO: Check if region exist
    if(searchRequest.region){
      filter.push({
        region: {
          equals: searchRequest.region
        }
      })
    }
    // TODO: Check if category exist
    if(searchRequest.category){
      filter.push({
        category: {
          equals: searchRequest.category
        }
      })
    }
    // TODO: Check if predicate exist
    if(searchRequest.predicate){
      filter.push({
        predicate: {
          equals: searchRequest.predicate
        }
      })
    }

    // TODO: Search Competition
    const competitions = await prismaClient.competition.findMany({
      where: {
        username: user.username,
        AND: filter
      },
      take: searchRequest.size,
      skip: skip
    })

    // TODO: Count number of Competition
    const total = await prismaClient.competition.count({
      where: {
        username: user.username,
        AND: filter
      }
    })

    // TODO: Convert Competition to CompetitionResponse
    return {
      data: competitions.map(competition => toCompetitionResponse(competition)),
      paging: {
        current_page: searchRequest.page,
        total_page: Math.ceil(total / searchRequest.size),
        size: searchRequest.size
      }
    }
    
  }
  
}