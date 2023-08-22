import { Router } from "express";

class AppRoutes {
    private route:Router;

    constructor() {
        this.route = Router();
    }

    loadAllRoutes() {
        this.route.use('/v1/restaurant',);
        return this.route;
    }
}

export const appRoutes = new AppRoutes();