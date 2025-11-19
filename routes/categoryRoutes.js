import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { create, list, update, remove } from "../controller/categoryController.js";

const router = express.Router();

router.post("/", protectRoute, create);
router.get("/", protectRoute, list);
router.put("/:id", protectRoute, update);
router.delete("/:id", protectRoute, remove);

export default router;
