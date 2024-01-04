import type {
  CreateTaskRequestHandler,
  DeleteTaskRequestHandler,
  GetTaskRequestHandler,
} from "./types";
import { UserService } from "../../service";
import { TaskService } from "../../service/TaskService";
import { TaskNotFoundError } from "../../error";

export const getController = (
  userService: UserService,
  taskService: TaskService
) => {
  const getTask: GetTaskRequestHandler = async (req, res, next) => {
    try {
      const userId = res.locals.userId;
      const tasks = await taskService.getTasksByUserId(userId);
      res.json({ success: true, data: tasks });
    } catch (error) {
      next(error);
    }
  };
  const createTask: CreateTaskRequestHandler = async (req, res, next) => {
    try {
      const userId = res.locals.userId;
      const { title, description, dueDate } = req.body;
      const tasks = await taskService.createTask(
        userId,
        title,
        description,
        dueDate
      );
      res.json({ success: true, data: tasks });
    } catch (error) {
      next(error);
    }
  };
  const deleteTask: DeleteTaskRequestHandler = async (req, res, next) => {
    try {
      const taskId = req.params.id;
      const userId = res.locals.userId;
      const deleteResult = await taskService.deleteById(userId, taskId);
      if (!deleteResult) {
        throw new TaskNotFoundError();
      }
      res.json({ success: true });
    } catch (error) {
      next(error);
    }
  };

  return {
    getTask,
    createTask,
    deleteTask,
  };
};
