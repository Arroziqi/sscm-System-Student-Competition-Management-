import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  CreateUserRequest,
  LoginUserRequest,
  toUserResponse,
  UpdateUserRequest,
  UserResponse,
} from "../model/user-model";
import { UserValidataion } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export class UserService {
  static async register(request: CreateUserRequest): Promise<UserResponse> {
    // TODO: Validate request
    const registeredRequest = Validation.validate(
      UserValidataion.REGISTER,
      request
    );

    // TODO: Check if user already exists
    const totalUserWithSameUsername = await prismaClient.user.count({
      where: {
        username: registeredRequest.username,
      },
    });

    // TODO: Throw error if user already exists
    if (totalUserWithSameUsername != 0) {
      throw new ResponseError(400, "User already exists");
    }

    // TODO: Hash password
    registeredRequest.password = await bcrypt.hash(
      registeredRequest.password,
      10
    );

    // TODO: Create user
    const user = await prismaClient.user.create({
      data: registeredRequest,
    });

    // TODO: Convert user to UserResponse
    return toUserResponse(user);
  }

  static async login(request: LoginUserRequest): Promise<UserResponse> {
    // TODO: Validate request
    const loginRequest = Validation.validate(UserValidataion.LOGIN, request);

    // TODO: Check if user exists
    let user = await prismaClient.user.findUnique({
      where: {
        username: loginRequest.username,
      },
    });

    // TODO: Throw error if user does not exist
    if (!user) {
      throw new ResponseError(401, "username or password is incorrect");
    }

    // TODO: Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(
      loginRequest.password,
      user.password
    );

    // TODO: Throw error if password is incorrect
    if (!isPasswordCorrect) {
      throw new ResponseError(401, "username or password is incorrect");
    }

    // TODO: Create token
    user = await prismaClient.user.update({
      where: {
        username: loginRequest.username,
      },
      data: {
        token: uuid(),
      },
    });

    // TODO: Convert user to UserResponse
    const response = toUserResponse(user);
    response.token = user.token!;
    return response;
  }

  // TODO: Get user
  static async get(user: User): Promise<UserResponse> {
    return toUserResponse(user);
  }

  // TODO: Update user
  static async update(
    user: User,
    request: UpdateUserRequest
  ): Promise<UserResponse> {
    // TODO: Validate request
    const updateRequest = Validation.validate(UserValidataion.UPDATE, request);

    // TODO: Update password
    if (updateRequest.password) {
      user.password = await bcrypt.hash(updateRequest.password, 10);
    }

    // TODO: Update email
    if (updateRequest.email) {
      user.email = updateRequest.email;
    }

    // TODO: Update user
    const updatedUser = await prismaClient.user.update({
      where: {
        username: user.username,
      },
      data: user,
    });

    // TODO: Convert user to UserResponse
    return toUserResponse(updatedUser);
  }

  // TODO: Logout user
  static async logout(user: User): Promise<UserResponse> {
    const logoutedUser = await prismaClient.user.update({
      where: {
        username: user.username,
      },
      data: {
        token: null,
      },
    });

    return toUserResponse(logoutedUser);
  }
}
