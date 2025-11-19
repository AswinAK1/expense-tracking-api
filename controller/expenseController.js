import * as expenseService from "../services/expenseService.js";

export const create = async (req, res) => {
  try {
    const exp = await expenseService.addExpense(req.user.userId, req.body);
    res.json(exp);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


export const monthlyExp = async (req, res) => {
  try {
    const { month, year } = req.query;

    const getExp = await expenseService.getMonthlyExpenses(
      req.user.id,
      month,
      year
    );

    res.json(getExp);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

