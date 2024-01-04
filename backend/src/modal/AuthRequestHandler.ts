import type { RequestHandler } from "express";
export type AuthRequestHandler<Body = any, UrlParams = any> = RequestHandler<
  UrlParams,
  unknown,
  Body,
  unknown,
  {
    userId: string;
  }
>;
