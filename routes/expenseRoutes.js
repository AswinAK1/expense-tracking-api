import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { create, monthlyExp } from "../controller/expenseController.js";

const router = express.Router();

router.post("/", protectRoute, create);
router.get("/monthly-expense",protectRoute,monthlyExp)

export default router;
