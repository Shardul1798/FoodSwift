import { Schema } from "mongoose";
import { USER_ROLES } from "../constants";

export interface IUser {
  _id: Schema.Types.ObjectId;
  username: string;
  name: string;
  email: string;
  phone: number;
  country_code: string;
  password: string;
  dob: Date;
  role: USER_ROLES;
  profile_pic: string;
  created_at: Date;
  updatedAt: Date;
}

export interface ISession extends Document {
  user_id: Schema.Types.ObjectId;
  expiryTime: Date;
  deviceType: string;
  deviceId: string;
  createdAt: Date;
  updatedAt: Date;
  status:string;
}
