import express from "express";
import { UserController } from "../controller/user-controller";

export const publicRouter = express.Router();

// TODO: User register route
publicRouter.post("/api/users", UserController.register);

// TODO: User login route
publicRouter.post("/api/users/login", UserController.login)