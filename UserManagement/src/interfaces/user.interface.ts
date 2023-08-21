import { USER_ROLES } from "../commons/constants";

export interface IUserLogin {
  username: string;
  password: string;
}

export interface IUserSignup {
  username: string;
  name: string;
  email: string;
  phone: number;
  country_code: string;
  password: string;
  dob: Date;
  role: USER_ROLES;
  profile_pic: string;
}