"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserResponse = toUserResponse;
// helper functions to convert User to UserResponse
function toUserResponse(user) {
    return {
        username: user.username,
        email: user.email
    };
}
