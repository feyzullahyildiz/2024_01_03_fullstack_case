import { BaseError } from "./BaseError";

export class UserAlreadyExistsError extends BaseError {
  constructor() {
    super("UserAlreadyExistsError", 400);
  }
}
