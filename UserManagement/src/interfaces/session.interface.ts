import { Schema } from "mongoose";

export interface IUserSession {
  _id: Schema.Types.ObjectId;
  user_id: Schema.Types.ObjectId;
  expiryTime: Date;
  deviceType: string;
  deviceId: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
}
