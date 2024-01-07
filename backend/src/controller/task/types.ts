import { AuthRequestHandler } from "../../modal";
export type GetTaskRequestHandler = AuthRequestHandler;
export type DeleteTaskRequestHandler = AuthRequestHandler<any, { id: string }>;
export type UpdateTaskRequestHandler = AuthRequestHandler<
  { status: "pending" | "completed" },
  { id: string }
>;
export type CreateTaskRequestHandler = AuthRequestHandler<{
  title: string;
  description: string;
  dueDate: Date;
}>;
