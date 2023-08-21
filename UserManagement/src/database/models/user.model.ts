import mongoose, { Schema, Document } from "mongoose";
import { USER_ROLES } from "../../commons/constants";
import { IUser } from "../../commons/interfaces/models.interface";

const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
    },
    phone: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    countryCode: {
      type: String,
      required: true,
      default: "+91",
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: [
        USER_ROLES.DELIVERY,
        USER_ROLES.RESTAURANT,
        USER_ROLES.USER
      ]
    },
    profile_pic: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", UserSchema);

export default User;