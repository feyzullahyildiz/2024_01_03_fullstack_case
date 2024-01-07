import { Router } from "express";
import { UserService, TaskService } from "../service";
import * as Task from "../controller/task";

export const getTaskRouter = (
  userService: UserService,
  taskService: TaskService
) => {
  const router = Router();

  const controller = Task.getController(userService, taskService);
  const middleware = Task.getBodyValidatorMiddleware();
  router.get("/", controller.getTask);
  router.post("/", middleware.createTask, controller.createTask);
  router.delete("/:id", controller.deleteTask);
  router.put("/:id/status", middleware.updateTaskStatus, controller.updateTaskStatus);
  return router;
};
