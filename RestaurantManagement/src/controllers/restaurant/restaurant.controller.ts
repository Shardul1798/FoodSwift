import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { restaurantService } from "../../services/restaurant.service";
import { apiResponse } from "../../utils/response";
import { HttpStatusCode, HttpStatusMessage } from "../../interfaces/enum";
import Restaurant from "../../database/models/restaurant.model";

dotenv.config();
class RestaurantController {
  async addNewRestaurant(req: Request, res: Response) {
    try {
      const payload = req.body;
      let findByName = { name: payload.name };
      const result = await restaurantService.findRestaurantByName(findByName);
      if (result) {
        return apiResponse.sendErrorResponse(
          res,
          result,
          "Name Already Exist",
          HttpStatusCode.BAD_REQUEST
        );
      }
      const createRestaurant = await restaurantService.createRestaurant(
        payload
      );
      if (!createRestaurant) {
        return apiResponse.sendErrorResponse(res, createRestaurant);
      }
      return apiResponse.sendSuccessResponse(res, createRestaurant);
    } catch (error) {
      console.error(error);
      return apiResponse.sendErrorResponse(
        res,
        error,
        HttpStatusMessage.INTERNAL_SERVER_ERROR,
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateMenuItem(req: Request, res: Response) {
    try {
      const findRestaurant = await Restaurant.findById(req.params.id);
      if (!findRestaurant) {
        return apiResponse.sendErrorResponse(
          res,
          findRestaurant,
          HttpStatusMessage.NOT_FOUND,
          HttpStatusCode.NOT_FOUND
        );
      }
      const updateMenu = Restaurant.updateOne(
        { _id: req.params.id },
        { $set: { menu: req.body } }
      );

      if (!updateMenu) {
        return apiResponse.sendErrorResponse(res, updateMenu);
      }
      return apiResponse.sendSuccessResponse(
        res,
        updateMenu,
        HttpStatusMessage.ACCEPTED,
        HttpStatusCode.ACCEPTED
      );
    } catch (error) {
      console.error(error);
      return apiResponse.sendErrorResponse(
        res,
        error,
        HttpStatusMessage.INTERNAL_SERVER_ERROR,
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateRestaurantDetails(req: Request, res: Response) {
    try {
      const payload = req.body;
      const id = req.params.id;
    } catch (error) {
      console.error(error);
      return apiResponse.sendErrorResponse(
        res,
        error,
        HttpStatusMessage.INTERNAL_SERVER_ERROR,
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async viewRestaurantDetails(req: Request, res: Response) {
    try {
      const id = req.params.id;
    } catch (error) {
      console.error(error);
      return apiResponse.sendErrorResponse(
        res,
        error,
        HttpStatusMessage.INTERNAL_SERVER_ERROR,
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async deleteRestaurant(req: Request, res: Response) {
    try {
      const id = req.params.id;
    } catch (error) {
      console.error(error);
      return apiResponse.sendErrorResponse(
        res,
        error,
        HttpStatusMessage.INTERNAL_SERVER_ERROR,
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export const restaurantController = new RestaurantController();
