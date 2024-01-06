import type { RequestHandler } from "express";

type CustomRequestHandler<Body = any> = RequestHandler<
  unknown,
  unknown,
  Body,
  unknown,
  {
    userId: string;
  }
>;

export type LoginRequestHandler = CustomRequestHandler<{
  email: string;
  password: string;
}>;
export type SignUpRequestHandler = CustomRequestHandler<{
  name: string;
  email: string;
  password: string;
}>;
