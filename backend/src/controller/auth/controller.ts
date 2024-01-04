import type { LoginRequestHandler, SignUpRequestHandler } from "./types.";
import { UserService } from "../../service/UserService";

export const getController = (userService: UserService) => {
  const login: LoginRequestHandler = async (req, res, next) => {
    try {
      const { email, password } = res.locals;
      const user = await userService.getUserByEmailAndPassword(email, password);
      
      res.json({ success: true, user });
    } catch (error) {
      next(error);
    }
  };
  const signUp: SignUpRequestHandler = async (req, res, next) => {
    try {
      const { email, name, password } = res.locals;
      const user = await userService.createUser(name, email, password);
      res.json({ success: true, user });
    } catch (error) {
      next(error);
    }
  };

  return {
    login,
    signUp,
  };
};
