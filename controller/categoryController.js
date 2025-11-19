// controller/categoryController.js
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
  const categories = await categoryService.getCategories(req.user.userId);
  res.json(categories);
};

export const update = async (req, res) => {
  try {
    const updated = await categoryService.updateCategory(
      req.user.userId,
      req.params.id,
      req.body
    );

    if (!updated) return res.status(404).json({ message: "Category not found" });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const remove = async (req, res) => {
  try {
    const deleted = await categoryService.deleteCategory(req.user.userId, req.params.id);

    if (!deleted) return res.status(404).json({ message: "Category not found" });

    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
