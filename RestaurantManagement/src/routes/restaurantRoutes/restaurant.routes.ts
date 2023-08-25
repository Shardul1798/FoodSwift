import { Router } from "express";
import { restaurantController } from "../../controllers/restaurant/restaurant.controller";
import { validate } from "../../middlewares/validation/validate";
import { addRestaurantBody, menuItem } from "../../middlewares/validation/createRestaurant.schema";

class RestaurantRoutes {
  private route: Router;

  constructor() {
    this.route = Router();
  }

  loadAllRoutes() {
    this.route.post(
      "/add",
      validate.body(addRestaurantBody),
      restaurantController.addNewRestaurant
    );
    this.route.put(
      "/update-menu/:id",
      validate.body(menuItem),
      restaurantController.updateMenuItem
    );
    // this.route.delete(
    //   "/delete/:id",
     
    // );
    // this.route.patch(
    //   "/change-status/:status",
     
    // );
    // this.route.get(
    //     "/detais/:id",

    // )
    return this.route;
  }
}

export const restaurantRoutes = new RestaurantRoutes();