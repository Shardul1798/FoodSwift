import cors from "cors";
import express, { Express } from "express";
import { appRoutes } from "../routes/routes";
import { createClient } from "redis";
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../database/models/user.model";
import Session from "../database/models/session.model";

dotenv.config();
let connectionData: any = {
  port: process.env.REDIS_PORT,
  host: "myRedis",
  index: 0,
  password: "mypassword",
};
export class UserApp {
  public static client = createClient(connectionData);
  private app: Express;
  private port: number = 3000;
  contextPath: string = "/api";

  constructor() {
    this.app = express();
    this.startApp();
  }

  private startApp(): void {
    this.loadGlobalMiddlewares();
    this.loadRoutes();
    this.initializeServer();
    this.connectRedis();
    this.connectToMongoDB();
  }

  private loadGlobalMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private loadRoutes() {
    this.app.use(this.contextPath, appRoutes.loadAllRoutes());
  }

  private initializeServer() {
    this.app.listen(this.port, this.callback);
  }

  private callback = () => {
    // logger.info(`Server listing on port: ${this.port}`);
  };

  private async connectRedis() {
    UserApp.client.on("error", (err) => console.log("Redis Client Error", err));
    await UserApp.client.connect();
    console.log("REDIS CONNECTED");
  }

  private async connectToMongoDB() {
    try {
      await mongoose.connect('mongodb://localhost:27017/food_swift', {
      });
      User.createCollection();
      Session.createCollection();
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection error:', error);
    }
  }
}
