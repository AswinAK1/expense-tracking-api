import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { create, monthlyExp, update, remove } from "../controller/expenseController.js";

const router = express.Router();

router.post("/", protectRoute, create);
router.get("/monthly-expense", protectRoute, monthlyExp);
router.put("/:id", protectRoute, update);
router.delete("/:id", protectRoute, remove);
export default router;
