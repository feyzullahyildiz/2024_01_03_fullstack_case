import { RequestHandler } from "express";
import { TokenService } from "../service/TokenService";
import { BaseError } from "../error/BaseError";
import { AuthRequestHandler } from "../modal";

export const getAuthMiddleware = (tokenService: TokenService) => {
  const handler: AuthRequestHandler = async (req, res, next) => {
    try {
      const headerValue = req.headers.authorization;
      if (typeof headerValue !== "string") {
        throw new BaseError(
          "Provide Bearer token in Authorization header",
          401
        );
      }
      const token = headerValue.split(" ")[1];
      const payload = await tokenService.validateToken(token);
      res.locals.userId = payload.id;
      next();
    } catch (error) {
      next(error);
    }
  };
  return handler;
};
