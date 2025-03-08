import express from "express";
import authRoutes from "./auth.route.js";
import userRoutes from "./user.route.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/auth", authRoutes);

export default router;
