import Category from "../models/Category.js";

export const createCategory = async (userId, data) => {
  return await Category.create({ userId, ...data });
};

export const getCategories = async (userId) => {
  return await Category.find({ userId });
};
