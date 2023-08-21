import { UserApp } from "./app";

export class Bootstrap {
    // private gRPC!: Grpc;
    private app!: UserApp;

    constructor() {
        this.startApplication();
    }

    public async startApplication() {
        // mongo.initiateUserMongoConnection();
        this.app = new UserApp();
        // this.gRPC = new Grpc();
    }
}