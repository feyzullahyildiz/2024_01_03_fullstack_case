import type { LoginRequestHandler, SignUpRequestHandler } from "./types.";
import { UserService } from "../../service/UserService";
import { TokenService } from "../../service/TokenService";
import { UnAuthorizedError } from "../../error";
import { UserAlreadyExistsError } from "../../error/UserAlreadyExistsError";

export const getController = (
  userService: UserService,
  tokenService: TokenService
) => {
  const login: LoginRequestHandler = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await userService.getUserByEmailAndPassword(email, password);
      if (!user) {
        throw new UnAuthorizedError();
      }
      const token = await tokenService.createToken(user.id);
      res.json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
        token,
      });
    } catch (error) {
      next(error);
    }
  };
  const signUp: SignUpRequestHandler = async (req, res, next) => {
    try {
      const { email, name, password } = req.body;

      const isUserAlreadyExists = await userService.isUserExistsByEmail(email);
      if (isUserAlreadyExists) {
        throw new UserAlreadyExistsError();
      }
      const user = await userService.createUser(name, email, password);
      res.json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  return {
    login,
    signUp,
  };
};
