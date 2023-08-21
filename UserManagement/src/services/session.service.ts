import { Schema } from "mongoose";
import Session from "../database/models/session.model";
import { USER_STATUS } from "../commons/constants";

class SessionService {
    async createUserSession(payload:any) {
        return await Session.create(payload);
    }

    async findSession(payload:any) {
        return await Session.findOne(payload);
    }

    async findUserSessionById(id:Schema.Types.ObjectId) {
        return await Session.findById(id);
    }
    
    async deactivateUserSession(id:Schema.Types.ObjectId) {
        return await Session.findOneAndUpdate({user_id: id}, {status: USER_STATUS.INACTIVE});
    }
}

export const sessionService = new SessionService();