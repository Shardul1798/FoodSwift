import mongoose, { Schema, Document } from "mongoose";
import { IRestaurant } from "../../commons/interfaces/models.interfaces";
import { RESTAURANT_STATUS } from "../../interfaces/enum";

const restaurantSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cuisine: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    menu: [
      {
        itemName: String,
        price: Number,
        category: String,
        itemRating: [
          {
            rating: Number,
            count: Number,
          },
        ],
      },
    ],
    status: {
      type: String,
      default: RESTAURANT_STATUS.ACTIVE,
    },
    openingHours: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Restaurant = mongoose.model<IRestaurant>("Restaurant", restaurantSchema);

export default Restaurant;
