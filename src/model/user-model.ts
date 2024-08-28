import {User} from "@prisma/client";
export type UserResponse = {
  username: string;
  email: string;
  token?: string;
}

export type CreateUserRequest = {
  username: string;
  password: string;
  email: string;
}

export type LoginUserRequest = {
  username: string;
  password: string;
}

// helper functions to convert User to UserResponse
export function toUserResponse(user: User): UserResponse{
  return {
    username: user.username,
    email: user.email
  }
}