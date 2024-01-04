import jwt from "jsonwebtoken";
export class TokenService {
  createToken = async (userId: string) => {
    const payload = {
      id: userId,
    };
    const token = await jwt.sign(payload, this.getSecret());
    return token;
  };

  validateToken = async (token: string) => {
    const body = await jwt.verify(token, this.getSecret());
    return body as jwt.JwtPayload & { id: string };
  };

  private getSecret = (): string => process.env.JWT_SECRET || "JWT_SECRET";
}
