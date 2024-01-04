import { Task } from "../db/Task";

export class TaskService {
  createTask = async (
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
    return await task.deleteOne();
  };
}
