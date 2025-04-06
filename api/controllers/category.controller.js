import Category from "../models/category.model.js";
import { errorHandler } from "../utils/error.js";

export const createCategory = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You do not have allowed to create a post!"));
  }

  if (!req.body.name) {
    return next(errorHandler(400, "Please provide required fields!"));
  }

  const slug = req.body.name
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

  const newCategory = new Category({
    ...req.body,
    slug,
    user: req.user.userId,
  });

  try {
    const saveCategory = await newCategory.save();
    res.status(201).json({
      category: saveCategory,
      success: true,
      message: "Category created successfully",
    });
  } catch (error) {
    next(error);
  }
};
