import bcrypt from "bcryptjs";
import { User } from "../db/User";

export class UserService {
  createUser = async (name: string, email: string, password: string) => {
    const hash = await this.hashPassword(password);
    return User.create({
      email,
      name,
      password: hash,
    });
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
  private hashPassword = async (rawPassword: string) => {
    return bcrypt.hash(rawPassword, 8);
  };
  private comparePassword = async (rawPassword: string, hash: string) => {
    return bcrypt.compare(rawPassword, hash);
  };
}
