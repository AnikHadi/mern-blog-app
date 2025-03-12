import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import { successHandler } from "../utils/success.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return next(errorHandler(400, "All fields are required"));
  }

  const hashPassword = bcryptjs.hashSync(password.trim(), 10);

  const newUser = new User({
    username,
    email,
    password: hashPassword,
  });

  try {
    await newUser.save();
    res.json(successHandler(201, "Signup successfully"));
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required"));
  }
  const filter = { email: email.trim() };

  try {
    const isValidUser = await User.findOne(filter).select({ __v: 0 });

    if (!isValidUser) {
      return next(errorHandler(400, "User not found"));
    } else {
      const isValidPassword = bcryptjs.compareSync(
        password,
        isValidUser.password
      );

      if (!isValidPassword) {
        return next(errorHandler(401, "Authentication failed!"));
      } else {
        const { password: pass, ...rest } = isValidUser._doc;

        const token = jwt.sign(
          { userId: isValidUser._id },
          process.env.JWT_TOKEN
        );

        res.status(200).cookie("access_token", token, { httpOnly: true }).json({
          user: rest,
          success: true,
          statusCode: 200,
          message: "Login Successful",
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { name, email, avatar } = req.body;

  const filter = { email: email };

  try {
    const isValidUser = await User.findOne(filter).select({ __v: 0 });

    if (!isValidUser) {
      const hashPassword = bcryptjs.hashSync(email, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(36).slice(-4),
        email,
        password: hashPassword,
        avatar,
      });
      await newUser.save();
      const { password, ...rest } = newUser._doc;
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_TOKEN);
      res.status(200).cookie("access_token", token, { httpOnly: true }).json({
        user: rest,
        success: true,
        statusCode: 200,
        message: "Login Successful",
      });
    } else {
      const { password, ...rest } = isValidUser._doc;

      const token = jwt.sign(
        { userId: isValidUser._id },
        process.env.JWT_TOKEN
      );

      res.status(200).cookie("access_token", token, { httpOnly: true }).json({
        user: rest,
        success: true,
        statusCode: 200,
        message: "Login Successful",
      });
    }
  } catch (error) {
    next(error);
  }
};
