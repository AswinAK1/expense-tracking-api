import * as summaryService from "../services/summaryService.js";

export const getSummary = async (req, res) => {
  const { month, year } = req.query;

  const summary = await summaryService.getMonthlySummary(
    req.user.userId,
    Number(month),
    Number(year)
  );

  res.json(summary);
};
