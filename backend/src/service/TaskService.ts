import { ITask } from "../db/Task";

export abstract class TaskService {
  abstract createTask(
    userId: string,
    title: string,
    description: string,
    dueDate: Date
  ): Promise<ITask>;

  abstract getTasksByUserId(taskId: string): Promise<ITask[]>;
  abstract deleteById(userId: string, id: string): Promise<ITask | null>;
  abstract updateStatus(
    userId: string,
    taskId: string,
    status: "pending" | "completed"
  ): Promise<ITask | null>;
}
