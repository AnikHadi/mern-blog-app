import express from "express";
import authRoutes from "./auth.route.js";
import categoryRoutes from "./category.route.js";
import commentRoutes from "./comment.route.js";
import postRoutes from "./post.route.js";
import userRoutes from "./user.route.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/auth", authRoutes);
router.use("/post", postRoutes);
router.use("/category", categoryRoutes);
router.use("/comment", commentRoutes);

export default router;
