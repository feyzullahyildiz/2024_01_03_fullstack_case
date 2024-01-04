import { Router } from "express";
import * as Auth from "../controller/auth";
import { UserService, TokenService } from "../service";

export const getAuthRouter = (
  userService: UserService,
  tokenService: TokenService
) => {
  const router = Router();
  const middleware = Auth.getBodyValidatorMiddleware();
  const controller = Auth.getController(userService, tokenService);
  router.post("/login", middleware.login, controller.login);
  router.post("/signup", middleware.signUp, controller.signUp);

  return router;
};
