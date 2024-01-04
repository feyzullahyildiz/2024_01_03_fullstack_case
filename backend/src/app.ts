import express, { Router } from "express";
import cors from "cors";
import { getAuthRouter } from "./router";
import { getDefaultErrorHandler } from "./middleware/default-error.handler";
import { UserService } from "./service/UserService";

export const createApp = (userService: UserService) => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  const authRouter = getAuthRouter(userService);

  const apiRouter = Router();
  apiRouter.use("/auth", authRouter);
  app.use("/api", apiRouter);
  const defaultErrorHandler = getDefaultErrorHandler();
  app.use(defaultErrorHandler);
  return app;
};
