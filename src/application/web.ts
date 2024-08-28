import express from "express";
import { publicRouter } from "../route/public-router";
import { errorMiddleware } from "../middleware/error-middleware";

export const web = express();
web.use(express.json());
// TODO: Register Public Routes
web.use(publicRouter);
// TODO: Register middleware
web.use(errorMiddleware);