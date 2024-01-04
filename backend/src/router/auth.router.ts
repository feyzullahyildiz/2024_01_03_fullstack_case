import { Router } from "express";
import * as Auth from "../controller/auth";
import { UserService } from "../service/UserService";

export const getAuthRouter = (userService: UserService) => {
  const router = Router();
  const middleware = Auth.getBodyValidatorMiddleware();
  const controller = Auth.getController(userService);
  router.post("/login", middleware.login, controller.login);
  router.post("/signup", middleware.signUp, controller.signUp);

  return router;
};
