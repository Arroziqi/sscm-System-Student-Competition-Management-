import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  CreateUserRequest,
  LoginUserRequest,
  toUserResponse,
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
}
