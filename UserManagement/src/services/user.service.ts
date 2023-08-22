import { Schema } from "mongoose";
import User from "../database/models/user.model";
import { IUserSignup } from "../interfaces/user.interface";

class UserService {
    async createUser(payload:IUserSignup) {
        return await User.create(payload);
    }

    async findSingleUser(payload:any) {
        return await User.findOne(payload);
    }

    async findUserById(id:Schema.Types.ObjectId) {
        return await User.findById(id);
    }

    async findAndUpdateUser(filter:any, update:any) {
        return await User.updateOne(filter,update);
    }
}

export const userService = new UserService();