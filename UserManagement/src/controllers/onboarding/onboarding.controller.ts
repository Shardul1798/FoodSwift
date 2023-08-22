import express, { Request, Response } from "express";
import { IUserLogin } from "../../interfaces/user.interface";
import { userService } from "../../services/user.service";
import bcrypt from "bcrypt";
import Session from "../../database/models/session.model";
import { USER_STATUS } from "../../commons/constants";
import { bearerAuthClass } from "../../middlewares/authorization/bearer.auth";
import { redisStorage } from "../../services/redis.service";
import { mailerConf, transporter } from "../../utils/nodemailer.utils";
import dotenv from "dotenv";

dotenv.config();
class OnboardingController {
  private passwordSalt = process.env.SALT || 10;
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
      if (!matchPassword) {
        return res.status(404).json({message: "Invalid Password"});
      }
      const expiryTime = Date.now() + 60 * 60 * 24;
      const sessionCreate: any = await Session.create({
        userId: result.id,
        expiresIn: expiryTime.toString(),
        deviceType: req.body.deviceType,
        deviceId: req.body.deviceId,
        status: USER_STATUS.ACTIVE,
      });
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
      return res
        .status(200)
        .json({ message: "Login Successfull", data: resp });
    } catch (error) {
      console.error(error);
      
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  async SignupHandler(req: Request, res: Response) {
    try {
      let payload = req.body;
      payload.password = await bcrypt.hash(payload.password, this.passwordSalt);
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

  async forgotPasswordHandler(req: Request, res: Response) {
    try {
      const { email } = req.body;

      const findUser = await userService.findSingleUser({ email: email });
      if (!findUser) {
        return res.status(404).json({ message: "User not found!" });
      }
      const OTP = Math.floor(1000 + Math.random() * 9000);
      if (OTP && findUser._id) {
        const key = findUser._id + "_otp";
        const value = OTP.toString();
        const result = await redisStorage.insertKeyInRedis(key, value);
        const resp: any = await bearerAuthClass.generateAuthToken(findUser._id);
        console.log(resp);
        if (result) {
          let user = {
            email: findUser.email,
            username: findUser.firstName,
            OTP: OTP,
            token: resp.accessToken,
          };
          const configureMail = mailerConf.setMailOptions(user);
          transporter.sendMail(configureMail, (error, info) => {
            if (error) {
              console.error("Error sending email:", error);
              return res.status(200).json({ message: "Error sending email!" });
            } else {
              console.log("Email sent:", info.response);
              return res.status(200).json({
                message: "Email to reset password sent successfully.",
              });
            }
          });
        }
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  async resetPasswordHandler(req: Request, res: Response) {
    try {
      const { otp, password, userId } = req.body;
      const result = await redisStorage.getKeyFromRedis(`${userId}_otp`);
      if (!result) {
        return res.status(404).json({ message: "Session Expired!" });
      }
      if (result && result == otp) {
        const hashedPassword = await bcrypt.hash(password, this.passwordSalt);
        const filter = { _id: userId };
        const update = { password: hashedPassword };
        const changePassword: any = await userService.findAndUpdateUser(
          filter,
          update
        );
        if (!changePassword) {
          return res.status(203).json({ message: "Something went wrong!" });
        }
        const resp = await redisStorage.deleteKeyFromRedis(`${userId}_otp`);
        if(resp) {
          return res
            .status(200)
            .json({ mesage: "Password Changed Successfully!" });
        }
        return res.status(500).json({message: "Failed to delete key from REDIS"});
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }
}

export const onboardingController = new OnboardingController();
