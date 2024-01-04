import { BaseError } from "./BaseError";

export class TaskNotFoundError extends BaseError {
  constructor() {
    super("TaskNotFoundError", 404);
  }
}
