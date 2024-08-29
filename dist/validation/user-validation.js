"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidataion = void 0;
const zod_1 = require("zod");
class UserValidataion {
}
exports.UserValidataion = UserValidataion;
UserValidataion.REGISTER = zod_1.z.object({
    username: zod_1.z.string().min(1).max(100),
    password: zod_1.z.string().min(1).max(100),
    email: zod_1.z.string().min(1).max(100),
});
UserValidataion.LOGIN = zod_1.z.object({
    username: zod_1.z.string().min(1).max(100),
    password: zod_1.z.string().min(1).max(100),
});
UserValidataion.UPDATE = zod_1.z.object({
    password: zod_1.z.string().min(1).max(100).optional(),
    email: zod_1.z.string().min(1).max(100).optional(),
});
