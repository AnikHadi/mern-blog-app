import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
  res.json({ message: "Welcome to the User API Routes!" });
};

export const getUsers = async (req, res) => {
  //   const users = await User.find();
  res.json("users");
};

export const updateUser = async (req, res, next) => {
  if (req.user.userId !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this user"));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, "Password must be at least 6 characters"));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorHandler(400, "Username must be between 7 and 20 characters")
      );
    }
    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "Username must not contain spaces"));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(403, "Username must be lowercase."));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "Username must contain only letters and numbers")
      );
    }
  }
  try {
    const filter = { _id: req.params.userId };
    const updateUser = await User.findByIdAndUpdate(
      filter,
      {
        $set: {
          username: req.body.username,
          password: req.body.password,
          avatar: req.body.avatar,
          email: req.body.email,
        },
      },
      { new: true }
    ).select({ __v: 0 });
    const { password: pass, ...rest } = updateUser._doc;
    res.json({
      user: rest,
      success: true,
      statusCode: 200,
      message: "User updated successfully",
    });
  } catch (error) {
    return next(error);
  }
};
