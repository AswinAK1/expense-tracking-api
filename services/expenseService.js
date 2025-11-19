import Expense from "../models/Expense.js";
import Category from "../models/Category.js";

export const addExpense = async (userId, data) => {
  const category = await Category.findById(data.categoryId);
  if (!category) throw new Error("Category not found");

  const expense = await Expense.create({ userId, ...data });

  return expense;
};

export const getMonthlyExpenses = async (userId, month, year) => {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0);

  return await Expense.find({
    userId,
    date: { $gte: start, $lte: end }
  }).populate("categoryId");
};
