import type { MeRequestHandler } from "./types.";
import { UserService } from "../../service/UserService";
import { TokenService } from "../../service/TokenService";
import { UnAuthorizedError } from "../../error";

export const getController = (
  userService: UserService,
) => {
  const me: MeRequestHandler = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      res.locals.userId;

      const user = await userService.getUserById(res.locals.userId);
      if (!user) {
        throw new UnAuthorizedError();
      }
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
    me,
  };
};
