import bcrypt from "bcryptjs";
import { User } from "../../db/User";
import { UserService } from "../UserService";

export class UserServiceImplementation extends UserService {
  createUser = async (name: string, email: string, password: string) => {
    const hash = await this.hashPassword(password);
    return User.create({
      email,
      name,
      password: hash,
    });
  };

  isUserExistsByEmail = async (email: string) => {
    const user = await User.exists({ email });
    return !!user;
  };
  getUserByEmailAndPassword = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user) {
      return null;
    }
    const passwordMatched = await this.comparePassword(password, user.password);
    if (!passwordMatched) {
      return null;
    }
    return user;
  };
  hashPassword = async (rawPassword: string) => {
    return bcrypt.hash(rawPassword, 8);
  };
  comparePassword = async (rawPassword: string, hash: string) => {
    return bcrypt.compare(rawPassword, hash);
  };
}
