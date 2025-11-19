import * as categoryService from "../services/categoryService.js";

export const create = async (req, res) => {
  try {
    const category = await categoryService.createCategory(req.user.userId, req.body);
    res.json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const list = async (req, res) => {
  const categories = await categoryService.getCategories(req.user.id);
  res.json(categories);
};
