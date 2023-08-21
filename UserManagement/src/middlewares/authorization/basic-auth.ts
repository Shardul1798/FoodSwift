import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();
class BasicAuth {
  constructor() {}

  handleBasicAuth(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({ message: "Authorization Required!" });
    }
    const token = header.split(" ")[1];
    const decodedCredentials = Buffer.from(token, "base64").toString("utf-8");
    const [username, password] = decodedCredentials.split(":");
    if (username === process.env.APP_USERNAME && password === process.env.APP_PASSWORD) {
      return next();
    } else {
      return res.status(401).json({message: "Authentication failed"});
    }
  }
}

export const basicAuth = new BasicAuth();