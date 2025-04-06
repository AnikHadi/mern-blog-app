import express from "express";
import { createCategory } from "../controllers/category.controller.js";
import { verifyToken } from "../utils/VerifyUser.js";
const router = express.Router();

router.post("/create", verifyToken, createCategory);

export default router;
