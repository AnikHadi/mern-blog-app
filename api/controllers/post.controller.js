import Category from "../models/category.model.js";
import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const createPost = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You do not have allowed to create a post!"));
  }

  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Please provide all required fields!"));
  }
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

  const filter = { slug: req.body.category };
  const category = await Category.findOne(filter).select({ __v: 0 });
  if (!category) {
    return next(errorHandler(404, "Category not found!"));
  }

  const newPost = new Post({
    ...req.body,
    category: category._id,
    slug,
    user: req.user.userId,
  });

  try {
    const savePost = await newPost.save();
    res.status(201).json({
      post: savePost,
      success: true,
      message: "Post created successfully",
    });
  } catch (error) {
    next(error);
  }
};
