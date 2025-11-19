import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getSummary } from "../controllers/summaryController.js";

const router = express.Router();

router.get("/", protectRoute, getSummary);

export default router;
