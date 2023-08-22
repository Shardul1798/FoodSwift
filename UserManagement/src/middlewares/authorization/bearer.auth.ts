import express, { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { IUserSession } from "../../interfaces/session.interface";
import { sessionService } from "../../services/session.service";
import { USER_STATUS } from "../../commons/constants";
import { redisStorage } from "../../services/redis.service";

dotenv.config();
class BearerAuth {
  private secret_key = process.env.SECRET_KEY || "";
  constructor() {}

  async handleBearerAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const authorization = req.headers.authorization;
      if (!authorization) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const verifyToken = await this.verifyBearerAuthToken(authorization);
      if (!verifyToken) {
        return res.status(403).json({ message: "Session Expired!" });
      }
      req.body.currentUserId = verifyToken.id;
      const checkRedisSession = await redisStorage.getKeyFromRedis(
        `${verifyToken.id}_${verifyToken.sessionId}`
      );
      if (checkRedisSession && checkRedisSession.status == USER_STATUS.ACTIVE) {
        next();
      } else {
        const haveSession: any = await sessionService.findUserSessionById(
          verifyToken.sessionId
        );
        if (haveSession?.status == USER_STATUS.ACTIVE) {
          next();
        } else {
          return res.status(403).json({ message: "Session Expired!" });
        }
      }
    } catch (error) {}
  }

  generateAuthToken = async (userId: any, sessionId?: any) => {
    if (!userId) {
      return Promise.reject("Tokenization Error");
    } else {
      try {
        let token;
        if (sessionId) {
          token = await jwt.sign(
            { id: userId, sessionId: sessionId },
            this.secret_key,
            { expiresIn: "24h" }
          );
        } else {
          //For reset password
          token = await jwt.sign({ id: userId }, this.secret_key, {
            expiresIn: 15 * 60,
          });
        }
        return { accessToken: token };
      } catch (error) {
        console.log(error);

        return Promise.reject("Authentication failed!");
      }
    }
  };

  verifyBearerAuthToken = async (tokenBody: any) => {
    try {
      if (!tokenBody) {
        return Promise.reject("Authentication Required");
      }
      const [authType, token] = tokenBody.split(/\s+/);
      const decodedToken: any = await jwt.verify(token, this.secret_key);
      if (!decodedToken) {
        return Promise.reject("Invalid Token");
      }
      return decodedToken;
    } catch (error) {}
  };
}

export const bearerAuthClass = new BearerAuth();
