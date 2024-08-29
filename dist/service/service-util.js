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
exports.CompetitionServiceUtil = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
class CompetitionServiceUtil {
    static checkCompetitionExistence(id, username) {
        return __awaiter(this, void 0, void 0, function* () {
            const competition = yield database_1.prismaClient.competition.findFirst({
                where: { id: id, username: username }
            });
            if (!competition) {
                throw new response_error_1.ResponseError(404, "Competition not found");
            }
            return competition;
        });
    }
}
exports.CompetitionServiceUtil = CompetitionServiceUtil;
