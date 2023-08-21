import { Router } from "express";
import { basicAuth } from "../../middlewares/authorization/basic-auth";
import { bodyValidator } from "../../middlewares/validation/body-validator";
import { onboardingController } from "../../controllers/onboarding/onboarding.controller";

class OnboardingRoutes {
    private route: Router;

    constructor() {
        this.route = Router();
    }

    loadAllRoutes() {
        this.route.post('/signin', basicAuth.handleBasicAuth,bodyValidator.validateLoginBody, onboardingController.LoginHandler);
        this.route.post('/signup', basicAuth.handleBasicAuth,bodyValidator.validateRegisterBody, onboardingController.SignupHandler);
        this.route.post('/forgot-password');
        this.route.patch('/reset-password');
        this.route.post('/verify-otp');
        return this.route;
    }
}

export const onboardingRoutes = new OnboardingRoutes();