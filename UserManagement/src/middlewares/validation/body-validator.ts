import express, { Request, Response } from "express";
import * as Joi from "joi";
import { USER_ROLES } from "../../commons/constants";

class RequestBodyValidator {
  async validateLoginBody(req: Request, res: Response, next: () => void) {
    try {
      const schema = Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
      });
      const result: any = schema.validate(req.body);
      if (result && result.error) {
        return res.status(400).json({
          error: result.error.details.map(function (el: any) {
            return el.message;
          }),
        });
      }
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: "Validation Error!" });
    }
  }

  async validateRegisterBody(req: Request, res: Response, next: () => void) {
    try {
      const schema = Joi.object().keys({
        username: Joi.string()
          .required()
          .pattern(/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\-="']+$/),
        password: Joi.string().required(),
        firstName: Joi.string().required().min(2).max(25),
        lastName: Joi.string().required().min(2).max(25),
        email: Joi.string().required(),
        gender: Joi.string().required(),
        phone: Joi.string().required(),
        dob: Joi.date(),
        role: Joi.string()
          .required()
          .valid(...Object.values(USER_ROLES)),
      });
      const result: any = schema.validate(req.body);
      if (result && result.error) {
        return res.status(400).json({
          error: result.error.details.map(function (el: any) {
            return el.message;
          }),
        });
      }
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: "Validation Error!" });
    }
  }
}

export const bodyValidator = new RequestBodyValidator();
