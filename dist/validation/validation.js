"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validation = void 0;
class Validation {
    static validate(scheme, data) {
        return scheme.parse(data);
    }
}
exports.Validation = Validation;
