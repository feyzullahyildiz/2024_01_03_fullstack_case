import { Task } from "../../db/Task";
import { TaskService } from "../TaskService";

export class TaskServiceImplementation extends TaskService {
  createTask = (
    userId: string,
    title: string,
    description: string,
    dueDate: Date
  ) => {
    return Task.create({
      userId,
      title,
      description,
      status: "pending",
      dueDate,
    });
  };
  getTasksByUserId = async (userId: string) => {
    return Task.find({ userId });
  };
  deleteById = async (userId: string, id: string) => {
    const task = await Task.findOne({ userId, _id: id });
    if (!task) {
      return null;
    }
    await task.deleteOne();
    return task;
  };
}
