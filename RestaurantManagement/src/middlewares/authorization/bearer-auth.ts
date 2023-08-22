import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export const generateJWT = async (userData: any) => {
  try {
    const newSessionData: any = await SessionModel.create({
      user_id: userData.user_id,
    });
    let jwtObj = {
      session_id: newSessionData.dataValues.session_id,
      user_id: newSessionData.dataValues.user_id,
    };
    let token = jwt.sign(jwtObj, "ayush", { expiresIn: "2h" });

    return token;
  } catch (e) {
    return e;
  }
};

export const jwtAuthorisation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: any;
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      token = req.headers.authorization.split(" ")[1];
      const tokenData = jwt.verify(token, "ayush");
      req.body.tokenData = tokenData;
      next();
    } else {
      res.status(401).send("UNAUTHORISED ACCESS");
    }
  } catch (e: any) {
    res.status(401).send("UNAUTHORISED ACCESS");
  }
};

export const sessionManagement = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { tokenData } = req.body;
    let sessionDetails = await SessionModel.findOne({
      where: { session_id: tokenData.session_id, user_id: tokenData.user_id },
    });
    if (sessionDetails) {
      next();
    } else {
      res.status(401).send("Authorisation Error");
    }
  } catch (e) {
    res.send(e);
  }
};
