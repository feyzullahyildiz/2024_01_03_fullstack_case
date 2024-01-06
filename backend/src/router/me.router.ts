import { Router } from "express";
import { UserService, TaskService } from "../service";
import * as Me from "../controller/me";

export const getMeRouter = (
  userService: UserService,
  taskService: TaskService
) => {
  const router = Router();

  const controller = Me.getController(userService);
  router.get("/", controller.me);
  return router;
};
