import { api } from "./api";

interface LoginRes {
  success: boolean;
  token: string;
}
export class AuthService {
  static async login(email: string, password: string) {
    try {
      const res = await api.post<LoginRes>("/auth/login", {
        email,
        password,
      });
      console.log("AuthService.login res", res);
      return res;
    } catch (error) {
      console.log("AuthService.login error", error);
      throw error;
    }
  }
  static signup(name: string, email: string, password: string) {
    return api.post("/auth/signup", {
      name,
      email,
      password,
    });
  }
}
