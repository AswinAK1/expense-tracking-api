import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { create } from "../controller/expenseController.js";

const router = express.Router();

router.post("/", protectRoute, create);

export default router;
