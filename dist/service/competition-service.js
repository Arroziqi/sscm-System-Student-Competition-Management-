"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompetitionService = void 0;
const competition_model_1 = require("../model/competition-model");
const competition_validation_1 = require("../validation/competition-validation");
const validation_1 = require("../validation/validation");
const database_1 = require("../application/database");
const logging_1 = require("../application/logging");
const service_util_1 = require("./service-util");
class CompetitionService {
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Parse year to Date
            request.year = new Date(request.year);
            // TODO: Validate request
            const createRequest = validation_1.Validation.validate(competition_validation_1.CompetitionValidation.CREATE, request);
            // TODO: Add username
            const data = Object.assign(Object.assign({}, createRequest), { username: user.username });
            // TODO: Create Competition
            const competition = yield database_1.prismaClient.competition.create({
                data: data
            });
            logging_1.logger.debug("record : " + JSON.stringify(competition));
            // TODO: Convert Competition to CompetitionResponse
            return (0, competition_model_1.toCompetitionResponse)(competition);
        });
    }
    static get(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Get Competition
            const competition = yield service_util_1.CompetitionServiceUtil.checkCompetitionExistence(id, user.username);
            // TODO: Convert Competition to CompetitionResponse
            return (0, competition_model_1.toCompetitionResponse)(competition);
        });
    }
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Parse year to Date
            if (request.year) {
                request.year = new Date(request.year);
            }
            // TODO: Validate request
            const updateRequest = validation_1.Validation.validate(competition_validation_1.CompetitionValidation.UPDATE, request);
            // TODO: Check Competition existence
            yield service_util_1.CompetitionServiceUtil.checkCompetitionExistence(updateRequest.id, user.username);
            // TODO: Update Competition
            const updatedCompetition = yield database_1.prismaClient.competition.update({
                where: {
                    id: updateRequest.id,
                    username: user.username
                },
                data: updateRequest
            });
            // TODO: Convert Competition to CompetitionResponse
            return (0, competition_model_1.toCompetitionResponse)(updatedCompetition);
        });
    }
    static remove(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Check Competition existence
            const competition = yield service_util_1.CompetitionServiceUtil.checkCompetitionExistence(id, user.username);
            // TODO: Remove Competition
            const removedCompetition = yield database_1.prismaClient.competition.delete({
                where: {
                    id: id,
                    username: user.username
                }
            });
            // TODO: Convert Competition to CompetitionResponse
            return (0, competition_model_1.toCompetitionResponse)(removedCompetition);
        });
    }
    static search(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Parse year to Date
            if (request.year) {
                const parsedYear = new Date(request.year);
                if (isNaN(parsedYear.getTime())) { // Cek jika date tidak valid
                    console.log('Invalid Date:', request.year);
                    throw new Error('Invalid date format');
                }
                request.year = parsedYear;
            }
            // console.log("query name : " + typeof request.name, request.name)
            // TODO: Validate request
            const searchRequest = validation_1.Validation.validate(competition_validation_1.CompetitionValidation.SEARCH, request);
            // TODO: Count number of 
            const skip = (searchRequest.page - 1) * searchRequest.size;
            // TODO: Create filter array
            const filter = [];
            // TODO: Search Competition with dynamic query
            // TODO: Check if name exist
            if (searchRequest.name) {
                filter.push({
                    name: {
                        contains: searchRequest.name
                    }
                });
            }
            // TODO: Check if year exist
            if (searchRequest.year) {
                filter.push({
                    year: {
                        equals: searchRequest.year
                    }
                });
            }
            // TODO: Check if region exist
            if (searchRequest.region) {
                filter.push({
                    region: {
                        equals: searchRequest.region
                    }
                });
            }
            // TODO: Check if category exist
            if (searchRequest.category) {
                filter.push({
                    category: {
                        equals: searchRequest.category
                    }
                });
            }
            // TODO: Check if predicate exist
            if (searchRequest.predicate) {
                filter.push({
                    predicate: {
                        equals: searchRequest.predicate
                    }
                });
            }
            // TODO: Search Competition
            const competitions = yield database_1.prismaClient.competition.findMany({
                where: {
                    username: user.username,
                    AND: filter
                },
                take: searchRequest.size,
                skip: skip
            });
            // TODO: Count number of Competition
            const total = yield database_1.prismaClient.competition.count({
                where: {
                    username: user.username,
                    AND: filter
                }
            });
            // TODO: Convert Competition to CompetitionResponse
            return {
                data: competitions.map(competition => (0, competition_model_1.toCompetitionResponse)(competition)),
                paging: {
                    current_page: searchRequest.page,
                    total_page: Math.ceil(total / searchRequest.size),
                    size: searchRequest.size
                }
            };
        });
    }
}
exports.CompetitionService = CompetitionService;
