import type { RequestHandler } from "express";
export type LoginRequestHandler = RequestHandler<
  unknown,
  unknown,
  unknown,
  unknown,
  {
    email: string;
    password: string;
  }
>;
export type SignUpRequestHandler = RequestHandler<
  unknown,
  unknown,
  unknown,
  unknown,
  {
    name: string;
    email: string;
    password: string;
  }
>;
