import express from "express";
import { publicRouter } from "../route/public-router";
import { errorMiddleware } from "../middleware/error-middleware";
import { apiRouter } from "../route/api";

export const web = express();
web.use(express.json());
// TODO: Register Public Routes
web.use(publicRouter);
// TODO: Register Private API
web.use(apiRouter);
// TODO: Register middleware
web.use(errorMiddleware);
