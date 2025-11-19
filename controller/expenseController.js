import * as expenseService from "../services/expenseService.js";

export const create = async (req, res) => {
  try {
    const exp = await expenseService.addExpense(req.user.userId, req.body);
    res.json(exp);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
