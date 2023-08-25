import { Schema } from "mongoose";

export interface IRestaurant {
    // _id: Schema.Types.ObjectId,
    name: string,
    description: string,
    cuisine: string,
    location: string,
    menu: IRestaurantMenu,
    openingHours: string,
    status: number
}

export interface IRatings {
    rating: number,
    review: string,
    user: Schema.Types.ObjectId
}

export interface IRestaurantMenu {
    itemName: string,
    price: number,
    category: string
}