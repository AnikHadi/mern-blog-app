import bcryptjs from "bcryptjs";
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
    username: username.trim(),
    email: email.trim(),
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
    const user = await User.find(filter).select({ __v: 0 });
    if (user && user.length > 0) {
      const isValidPassword = await bcryptjs.compare(
        password.trim(),
        user[0].password
      );

      if (isValidPassword) {
        // const token = jwt.sign({ userId: user[0]._id }, process.env.JWT_TOKEN);
        const getUser = JSON.parse(JSON.stringify(user[0]));
        delete getUser.password;
        return res.json({
          // accessToken: token,
          user: { ...getUser },
          success: true,
          statusCode: 200,
          message: "Login Successful",
        });
      } else {
        next(errorHandler(401, "Authentication failed!"));
      }
    } else {
      next(errorHandler(400, "Authentication failed!"));
    }
  } catch (error) {
    next(error);
  }
};
