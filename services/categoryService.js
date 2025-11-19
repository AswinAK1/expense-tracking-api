import Category from "../model/Category.js";

export const createCategory = async (userId, data) => {
  return await Category.create({ userId, ...data });
};

export const getCategories = async (userId) => {
  return await Category.find({ userId });
};

export const updateCategory = async (userId, categoryId, data) => {
  return await Category.findOneAndUpdate(
    { _id: categoryId, userId },
    data,
    { new: true }
  );
};

export const deleteCategory = async (userId, categoryId) => {
  return await Category.findOneAndDelete({
    _id: categoryId,
    userId
  });
};
