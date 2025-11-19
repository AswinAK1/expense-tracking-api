// services/expenseService.js
import Expense from "../model/Expense.js";
import Category from "../model/Category.js";

export const addExpense = async (userId, data) => {
  const category = await Category.findById(data.categoryId);
  if (!category) throw new Error("Category not found");

  return await Expense.create({ userId, ...data });
};

export const getMonthlyExpenses = async (userId, month, year) => {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0);

  return await Expense.find({
    userId,
    date: { $gte: start, $lte: end }
  }).populate("categoryId");
};

export const updateExpense = async (userId, expenseId, data) => {
  if (data.categoryId) {
    const category = await Category.findById(data.categoryId);
    if (!category) throw new Error("Category not found");
  }

  return await Expense.findOneAndUpdate(
    { _id: expenseId, userId },
    data,
    { new: true }
  );
};

export const deleteExpense = async (userId, expenseId) => {
  return await Expense.findOneAndDelete({
    _id: expenseId,
    userId
  });
};
