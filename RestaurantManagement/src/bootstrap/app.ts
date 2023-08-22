import cors from "cors";
import express, { Express } from "express";
import { appRoutes } from "../routes/routes";
import { createClient } from "redis";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { logger } from "../utils/logger";

dotenv.config();
let connectionData: any = {
  port: process.env.REDIS_PORT,
  host: "myRedis",
  index: 0,
  password: "mypassword",
};
export class RestaurantApp {
  public static client = createClient(connectionData);
  private app: Express;
  private port: number = Number(process.env.PORT);
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
    logger.info(`Server listing on port: ${this.port}`);
  };

  private async connectRedis() {
    RestaurantApp.client.on("error", (err) => console.log("Redis Client Error", err));
    await RestaurantApp.client.connect();
    console.log("REDIS CONNECTED");
  }

  private async connectToMongoDB() {
    try {
      await mongoose.connect('mongodb://localhost:27017/food_swift', {
      });
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection error:', error);
    }
  }
}