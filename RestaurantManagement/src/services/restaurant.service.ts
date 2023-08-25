import Restaurant from "../database/models/restaurant.model";

class RestaurantService {

    async findRestaurantByName(filter:any) {
        return await Restaurant.findOne(filter);
    }

    async createRestaurant(payload:any) {
        return await Restaurant.create(payload);
    }

    async updateRestaurant(filter:any, update:any) {
        return await Restaurant.updateOne(filter,update);
    }

    async getRestaurantDetails(id:any) {
        return await Restaurant.findById(id);
    }

    async deleteRestaurant(id:any) {
        return await Restaurant.findByIdAndDelete(id);
    }

    async changeRestaurantStatus(id:any) {
        return await Restaurant.findByIdAndUpdate();
    }
}

export const restaurantService = new RestaurantService();