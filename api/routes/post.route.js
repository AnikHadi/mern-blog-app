import express from "express";
import {
  createPost,
  deletePost,
  editPost,
  getPosts,
} from "../controllers/post.controller.js";
import { verifyToken } from "../utils/VerifyUser.js";
const router = express.Router();

router.post("/create", verifyToken, createPost);
router.get("/get-posts", getPosts);
router.delete("/delete-post/:postId/:userId", verifyToken, deletePost);
router.put("/edit/:postId", verifyToken, editPost);

export default router;
