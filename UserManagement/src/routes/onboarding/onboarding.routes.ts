import { Router } from "express";

class OnboardingRoutes {
    private route: Router;

    constructor() {
        this.route = Router();
    }

    loadAllRoutes() {
        this.route.post('/signin');
        this.route.post('/signup');
        this.route.post('/forgot-password');
        this.route.patch('/reset-password');
        this.route.post('/verify-otp');
        return this.route;
    }
}

export const onboardingRoutes = new OnboardingRoutes();