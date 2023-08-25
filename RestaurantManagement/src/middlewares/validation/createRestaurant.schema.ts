import * as Joi from "joi";

export const addRestaurantBody = Joi.object().keys({
  name: Joi.string().required().min(2).max(50),
  description: Joi.string().required().min(25).max(250),
  cuisine: Joi.string().required(),
  location: Joi.string().required(),
  menu: Joi.array(),
  openingHours: Joi.string().required(),
});

export const menuItem = Joi.object().keys({
  itemName: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
});
