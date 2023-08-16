import cors from "cors";
import express, { Express } from "express";
import { appRoutes } from "../routes/routes";

export class UserApp {
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
}
