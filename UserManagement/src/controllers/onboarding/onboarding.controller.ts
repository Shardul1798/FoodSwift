import express, { Request, Response } from "express";
import { IUserLogin } from "../../interfaces/user.interface";
import { userService } from "../../services/user.service";
import bcrypt from "bcrypt";
import Session from "../../database/models/session.model";
import { USER_STATUS } from "../../commons/constants";
import { bearerAuthClass } from "../../middlewares/authorization/bearer.auth";
import { redisStorage } from "../../services/redis.service";

class OnboardingController {
  async LoginHandler(req: Request, res: Response) {
    try {
      const payload: IUserLogin = {
        username: req.body.username,
        password: req.body.password,
      };
      const result = await userService.findSingleUser({
        username: payload.username,
      });
      if (!result) {
        return res
          .status(200)
          .json({ message: "Invalid username or password" });
      }
      const matchPassword = await bcrypt.compare(
        payload.password,
        result.password
      );
      if (matchPassword) {
        const expiryTime = Date.now() + 60 * 60 * 24;
        const sessionCreate: any = await Session.create({
          userId: result.id,
          expiresIn: expiryTime.toString(),
          deviceType: req.body.deviceType,
          status: USER_STATUS.ACTIVE,
        });
        console.log(sessionCreate);

        const resp: any = await bearerAuthClass.generateAuthToken(
          result.id,
          sessionCreate.id
        );
        const key = `${result.id}_${sessionCreate.id}}`;
        const value = {
          userId: result.id,
          expiryTime: expiryTime,
          status: USER_STATUS.ACTIVE,
          sessionId: sessionCreate._id,
        };
        const createRedisSession = await redisStorage.insertKeyInRedis(
          key,
          value
        );
        if (!createRedisSession) {
          return res.status(203).json({ message: "Something went wrong!" });
        }
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  async SignupHandler(req: Request, res: Response) {
    try {
      const payload = req.body;
      const findEmail = await userService.findSingleUser({
        email: payload.email,
      });
      if (findEmail)
        return res.status(200).json({ message: "Email already exists!" });
      const findUsername = await userService.findSingleUser({
        username: payload.username,
      });
      if (findUsername)
        return res.status(200).json({ message: "Username already exists!" });
      const findPhone = await userService.findSingleUser({
        phone: payload.phone,
      });
      if (findPhone)
        return res
          .status(200)
          .json({ message: "Phone number already exists!" });
      const result = await userService.createUser(payload);
      if (!result) {
        return res
          .status(500)
          .json({ message: "Something went wrong! Please try later" });
      }
      return res.status(200).json({ message: "Signup successfully!" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }
}

export const onboardingController = new OnboardingController();