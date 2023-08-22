import { RestaurantApp } from "./app";

export class Bootstrap {
    // private gRPC!: Grpc;
    private app!: RestaurantApp;

    constructor() {
        this.startApplication();
    }

    public async startApplication() {

        // mongo.initiateUserMongoConnection();
        this.app = new RestaurantApp();
        // this.gRPC = new Grpc();
    }
}