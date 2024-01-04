import type { RequestHandler } from "express";
export type LoginRequestHandler = RequestHandler<
  unknown,
  unknown,
  {
    email: string;
    password: string;
  },
  unknown,
  any
>;
export type SignUpRequestHandler = RequestHandler<
  unknown,
  unknown,
  {
    name: string;
    email: string;
    password: string;
  },
  unknown,
  any
>;
