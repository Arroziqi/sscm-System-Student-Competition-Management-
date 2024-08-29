"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCompetitionResponse = toCompetitionResponse;
function toCompetitionResponse(comp) {
    return {
        id: comp.id,
        name: comp.name,
        year: comp.year,
        region: comp.region,
        category: comp.category,
        predicate: comp.predicate,
    };
}
