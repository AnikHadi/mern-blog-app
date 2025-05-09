import express from "express";
import {
  deleteUser,
  getUsers,
  signout,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/VerifyUser.js";

const router = express.Router();

router.post("/signout", signout);
router.get("/get-users", verifyToken, getUsers);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.put("/update/:userId", verifyToken, updateUser);

export default router;
