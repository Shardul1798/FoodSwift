import mongoose, { Document, Schema } from "mongoose";
import User from "./user.model";
import { ISession } from "../../commons/interfaces/models.interface";

const sessionSchema = new Schema<ISession>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
    expiryTime: {
      type: Date,
    },
    deviceType: {
      type: Schema.Types.String,
      required: true,
    },
    deviceId: {
      type: Schema.Types.String,
      required: true,
    },
    status: {
      type: Schema.Types.String,
      required: true,
    },
  },
  { timestamps: true }
);

const Session = mongoose.model<ISession>("Session", sessionSchema);

export default Session;
