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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const user_model_1 = require("../model/user-model");
const user_validation_1 = require("../validation/user-validation");
const validation_1 = require("../validation/validation");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
class UserService {
    static register(request) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Validate request
            const registeredRequest = validation_1.Validation.validate(user_validation_1.UserValidataion.REGISTER, request);
            // TODO: Check if user already exists
            const totalUserWithSameUsername = yield database_1.prismaClient.user.count({
                where: {
                    username: registeredRequest.username,
                },
            });
            // TODO: Throw error if user already exists
            if (totalUserWithSameUsername != 0) {
                throw new response_error_1.ResponseError(400, "User already exists");
            }
            // TODO: Hash password
            registeredRequest.password = yield bcrypt_1.default.hash(registeredRequest.password, 10);
            // TODO: Create user
            const user = yield database_1.prismaClient.user.create({
                data: registeredRequest,
            });
            // TODO: Convert user to UserResponse
            return (0, user_model_1.toUserResponse)(user);
        });
    }
    static login(request) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Validate request
            const loginRequest = validation_1.Validation.validate(user_validation_1.UserValidataion.LOGIN, request);
            // TODO: Check if user exists
            let user = yield database_1.prismaClient.user.findUnique({
                where: {
                    username: loginRequest.username,
                },
            });
            // TODO: Throw error if user does not exist
            if (!user) {
                throw new response_error_1.ResponseError(401, "username or password is incorrect");
            }
            // TODO: Check if password is correct
            const isPasswordCorrect = yield bcrypt_1.default.compare(loginRequest.password, user.password);
            // TODO: Throw error if password is incorrect
            if (!isPasswordCorrect) {
                throw new response_error_1.ResponseError(401, "username or password is incorrect");
            }
            // TODO: Create token
            user = yield database_1.prismaClient.user.update({
                where: {
                    username: loginRequest.username,
                },
                data: {
                    token: (0, uuid_1.v4)(),
                },
            });
            // TODO: Convert user to UserResponse
            const response = (0, user_model_1.toUserResponse)(user);
            response.token = user.token;
            return response;
        });
    }
    // TODO: Get user
    static get(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, user_model_1.toUserResponse)(user);
        });
    }
    // TODO: Update user
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Validate request
            const updateRequest = validation_1.Validation.validate(user_validation_1.UserValidataion.UPDATE, request);
            // TODO: Update password
            if (updateRequest.password) {
                user.password = yield bcrypt_1.default.hash(updateRequest.password, 10);
            }
            // TODO: Update email
            if (updateRequest.email) {
                user.email = updateRequest.email;
            }
            // TODO: Update user
            const updatedUser = yield database_1.prismaClient.user.update({
                where: {
                    username: user.username,
                },
                data: user,
            });
            // TODO: Convert user to UserResponse
            return (0, user_model_1.toUserResponse)(updatedUser);
        });
    }
    // TODO: Logout user
    static logout(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const logoutedUser = yield database_1.prismaClient.user.update({
                where: {
                    username: user.username,
                },
                data: {
                    token: null,
                },
            });
            return (0, user_model_1.toUserResponse)(logoutedUser);
        });
    }
}
exports.UserService = UserService;
