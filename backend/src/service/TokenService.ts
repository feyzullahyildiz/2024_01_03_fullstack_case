import jwt from "jsonwebtoken";
export abstract class TokenService {
  abstract createToken(userId: string): Promise<string>;
  abstract validateToken(token: string): Promise<jwt.JwtPayload & { id: string }>;
}
