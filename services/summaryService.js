import Category from "../model/Category.js";
import Expense from "../model/Expense.js";

export const getMonthlySummary = async (userId, month, year) => {
  const categories = await Category.find({ userId });

  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0);

  const expenses = await Expense.aggregate([
    {
      $match: {
        userId,
        date: { $gte: start, $lte: end }
      }
    },
    {
      $group: {
        _id: "$categoryId",
        spent: { $sum: "$amount" }
      }
    }
  ]);

  return categories.map(cat => {
    const exp = expenses.find(e => e._id.toString() === cat._id.toString());

    return {
      category: cat.name,
      limit: cat.monthlyLimit,
      spent: exp ? exp.spent : 0,
      remaining: cat.monthlyLimit - (exp ? exp.spent : 0),
      status: (exp?.spent ?? 0) > cat.monthlyLimit ? "over" : "within"
    };
  });
};
