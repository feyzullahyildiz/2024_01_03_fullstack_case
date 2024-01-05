import { createApp } from "../../src/app";
import { TokenServiceImplementation } from "../../src/service/implementation";

interface Options {
  getUserByEmailAndPassword?: jest.Func;
}
export const createTestApp = (opt: Options) => {

  const getUserByEmailAndPassword = opt.getUserByEmailAndPassword || jest.fn();
  const taskService = {
    createTask: jest.fn(),
    deleteById: jest.fn(),
    getTasksByUserId: jest.fn(),
  };
  const userService = {
    createUser: jest.fn(),
    getUserByEmailAndPassword,
    isUserExistsByEmail: jest.fn(),
    hashPassword: jest.fn(),
    comparePassword: jest.fn(),
  };
  return createApp(userService, new TokenServiceImplementation(), taskService);
};
