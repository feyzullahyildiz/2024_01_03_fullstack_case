/* eslint-disable no-unused-vars */
export class BaseError {
    constructor(
      public readonly message: string,
      public readonly status: number,
    ) {}
  }