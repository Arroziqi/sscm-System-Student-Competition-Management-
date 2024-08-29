"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompetitionValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
class CompetitionValidation {
}
exports.CompetitionValidation = CompetitionValidation;
CompetitionValidation.CREATE = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100),
    year: zod_1.z.date(),
    region: zod_1.z.nativeEnum(client_1.Region),
    category: zod_1.z.nativeEnum(client_1.Category),
    predicate: zod_1.z.nativeEnum(client_1.Predicate)
});
CompetitionValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    name: zod_1.z.string().min(1).max(100).optional(),
    year: zod_1.z.date().optional(),
    region: zod_1.z.nativeEnum(client_1.Region).optional(),
    category: zod_1.z.nativeEnum(client_1.Category).optional(),
    predicate: zod_1.z.nativeEnum(client_1.Predicate).optional()
});
CompetitionValidation.SEARCH = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100).optional(),
    year: zod_1.z.date().optional(),
    region: zod_1.z.nativeEnum(client_1.Region).optional(),
    category: zod_1.z.nativeEnum(client_1.Category).optional(),
    predicate: zod_1.z.nativeEnum(client_1.Predicate).optional(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).max(100).positive()
});
