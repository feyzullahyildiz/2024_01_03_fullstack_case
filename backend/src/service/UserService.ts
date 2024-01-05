import { IUser } from "../db/User";

export abstract class UserService {
  abstract createUser(
    name: string,
    email: string,
    password: string
  ): Promise<IUser>;
  abstract isUserExistsByEmail(email: string): Promise<boolean>;
  abstract getUserByEmailAndPassword(
    email: string,
    password: string
  ): Promise<IUser | null>;

  abstract hashPassword(rawPassword: string): Promise<string>;
  abstract comparePassword(rawPassword: string, hash: string): Promise<boolean>;
}
