import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();
class Auth {
  constructor() {}

  basicAuth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const encodedCredentials = authHeader.split(" ")[1];
      const decodedCredentials = Buffer.from(
        encodedCredentials,
        "base64"
      ).toString("utf-8");
      const [receivedUsername, receivedPassword] =
        decodedCredentials.split(":");
      if (
        receivedUsername === process.env.APP_USERNAME &&
        receivedPassword === process.env.APP_PASSWORD
      ) {
        return next();
      } else {
        return res.status(401).send("Authentication failed");
      }
    } else {
      return res.status(401).send("Authentication failed");
    }
  }
}

export const auth = new Auth();
