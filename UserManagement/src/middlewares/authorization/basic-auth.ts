import { Request, Response, NextFunction } from "express";

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
    if (username === username && password === password) {
      return next();
    } else {
      return res.status(401).send("Authentication failed");
    }
  }
}
