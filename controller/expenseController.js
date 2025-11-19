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
      req.user.userId,
      month,
      year
    );

    res.json(getExp);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const updated = await expenseService.updateExpense(
      req.user.userId,
      req.params.id,
      req.body
    );

    if (!updated) return res.status(404).json({ message: "Expense not found" });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const remove = async (req, res) => {
  try {
    const deleted = await expenseService.deleteExpense(
      req.user.userId,
      req.params.id
    );

    if (!deleted) return res.status(404).json({ message: "Expense not found" });

    res.json({ message: "Expense deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
