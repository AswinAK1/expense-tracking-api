import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { create, list } from "../controller/categoryController.js";

const router = express.Router();

router.post("/", protectRoute, create);
router.get("/", protectRoute, list);

export default router;
