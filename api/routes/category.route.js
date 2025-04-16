import express from "express";
import {
  createCategory,
  getAllCategories,
} from "../controllers/category.controller.js";
import { verifyToken } from "../utils/VerifyUser.js";
const router = express.Router();

router.post("/create", verifyToken, createCategory);
router.get("/all", verifyToken, getAllCategories);

export default router;
