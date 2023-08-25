import { Router } from "express";
import { restaurantRoutes } from "./restaurantRoutes/restaurant.routes";

class AppRoutes {
    private route:Router;

    constructor() {
        this.route = Router();
    }

    loadAllRoutes() {
        this.route.use('/v1/restaurant',restaurantRoutes.loadAllRoutes());
        return this.route;
    }
}

export const appRoutes = new AppRoutes();