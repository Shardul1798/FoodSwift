import { Router } from "express";
import { onboardingRoutes } from "./onboarding/onboarding.routes";

class AppRoutes {
    private route:Router;

    constructor() {
        this.route = Router();
    }

    loadAllRoutes() {
        this.route.use('/auth', onboardingRoutes.loadAllRoutes());
        return this.route;
    }
}

export const appRoutes = new AppRoutes();