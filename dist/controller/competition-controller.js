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
exports.CompetitionController = void 0;
const competition_service_1 = require("../service/competition-service");
class CompetitionController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // TODO: Create request
                const request = req.body;
                // TODO: Call for Response
                const response = yield competition_service_1.CompetitionService.create(req.user, request);
                // TODO: Send Response
                res.status(200).json({
                    data: response,
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // TODO: Get competition id
                const competitionId = Number(req.params.competitionId);
                // TODO: Call for Response
                const response = yield competition_service_1.CompetitionService.get(req.user, competitionId);
                // TODO: Send Response
                res.status(200).json({
                    data: response,
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // TODO: Create request
                const request = req.body;
                request.id = Number(req.params.competitionId);
                // TODO: Call for Response
                const response = yield competition_service_1.CompetitionService.update(req.user, request);
                // TODO: Send Response
                res.status(200).json({
                    data: response,
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static remove(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const competitionId = Number(req.params.competitionId);
                // TODO: Call for Response
                const response = yield competition_service_1.CompetitionService.remove(req.user, competitionId);
                // TODO: Send Response
                res.status(200).json({
                    data: "OK",
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static search(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = {
                    name: req.query.name,
                    year: req.query.year ? new Date(req.query.year) : undefined,
                    region: req.query.region || undefined,
                    category: req.query.category || undefined,
                    predicate: req.query.predicate || undefined,
                    page: req.query.page ? Number(req.query.page) : 1,
                    size: req.query.size ? Number(req.query.size) : 10,
                };
                // TODO: Call for Response
                const response = yield competition_service_1.CompetitionService.search(req.user, request);
                // TODO: Send Response
                res.status(200).json(response);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.CompetitionController = CompetitionController;
