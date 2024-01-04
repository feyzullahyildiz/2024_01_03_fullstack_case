import express, { Router } from "express";
import cors from "cors";
import { getAuthRouter, getTaskRouter } from "./router";
import { getDefaultErrorHandler } from "./middleware/default-error.handler";
import { UserService } from "./service/UserService";
import { TokenService } from "./service/TokenService";
import { getAuthMiddleware } from "./middleware/auth.middleware";
import { TaskService } from "./service/TaskService";

export const createApp = (
  userService: UserService,
  tokenService: TokenService,
  taskService: TaskService
) => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  const authRouter = getAuthRouter(userService, tokenService);
  const taskRouter = getTaskRouter(userService, taskService);
  const authMiddleware = getAuthMiddleware(tokenService);

  const apiRouter = Router();
  apiRouter.use("/auth", authRouter);

  apiRouter.use(authMiddleware);

  apiRouter.use("/task", taskRouter);
  app.use("/api", apiRouter);
  const defaultErrorHandler = getDefaultErrorHandler();
  app.use(defaultErrorHandler);
  return app;
};
