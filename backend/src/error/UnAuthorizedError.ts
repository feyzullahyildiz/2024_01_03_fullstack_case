import { BaseError } from "./BaseError";

export class UnAuthorizedError extends BaseError {
  constructor() {
    super("UnAuthorizedError", 401);
  }
}
