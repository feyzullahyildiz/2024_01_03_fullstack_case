import { authenticatedApi } from "./api";

interface MeRes {
  success: boolean;
  user: {
    _id: string;
    name: string;
    email: string;
  };
}
export class MeService {
  static async me() {
    await new Promise((res) => setTimeout(res, 1000));
    return authenticatedApi.get<MeRes>("/me").then((res) => res.data);
  }
}
