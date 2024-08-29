import { Response, NextFunction } from "express";
import { prismaClient } from "../application/database";
import { UserRequest } from "../type/user-request";

export const authMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  // TODO: get token
  const token = req.get('X-API-TOKEN');

  // TODO: validate token
  if(token){
    // TODO: get user
    const user = await prismaClient.user.findFirst({
      where:{
        token: token
      }
    });

    // TODO: send user to request
    if(user){
      req.user = user;
      next();
      return;
    }
  }

  // TODO: throw error if token is invalid
  res.status(401).json({
    errors: "unauthorized"
  })
}