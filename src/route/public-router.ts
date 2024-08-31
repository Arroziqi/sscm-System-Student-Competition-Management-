import express from "express";
import { UserController } from "../controller/user-controller";

export const publicRouter = express.Router();

publicRouter.get("/", (req, res) => {
  console.log("Public route accessed");
  res.status(200).json({ data: "Hello World" });
});

// TODO: User register route
publicRouter.post("/api/users", UserController.register);

// TODO: User login route
publicRouter.post("/api/users/login", UserController.login);
