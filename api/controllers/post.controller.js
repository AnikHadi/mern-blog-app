import mongoose from "mongoose";
import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";
const ObjectId = mongoose.Types.ObjectId;

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

  // const filter = { slug: req.body.category };
  // const category = await category.findOne(filter).select({ __v: 0 });

  const newPost = new Post({
    ...req.body,
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

export const getPosts = async (req, res, next) => {
  const { userId, category, slug, postId, searchTerm } = req.query;
  const startIndex = parseInt(req.query.startIndex) || 0;
  const limit = parseInt(req.query.limit) || 9;
  const sortDirection = req.query.order === "asc" ? 1 : -1;
  // const userID = new mongoose.Types.ObjectId(userId);

  const filter = {
    ...(userId && { user: userId }),
    ...(category && { category: category }),
    ...(slug && { slug: slug }),
    ...(postId && { _id: postId }),
    ...(searchTerm && {
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { content: { $regex: searchTerm, $options: "i" } },
      ],
    }),
  };

  try {
    const posts = await Post.find(filter)
      .populate("user")
      .skip(startIndex)
      .limit(limit)
      .sort({ updatedAt: sortDirection });

    const totalPosts = await Post.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
    const lastMonthPosts = await Post.find({
      createdAt: { $gte: oneMonthAgo },
    }).countDocuments();

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: Math.ceil(startIndex / limit) + 1,
      hasNextPage: startIndex + limit < totalPosts,
      hasPreviousPage: startIndex > 0,
      nextPage: startIndex + limit < totalPosts ? startIndex + limit : null,

      success: true,
      message: "Posts fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getSinglePosts = async (req, res, next) => {
  const { postId } = req.params;
  // if (!userId) {
  //   return next(errorHandler(400, "Please provide User ID!"));
  // }
  if (!postId) {
    return next(errorHandler(400, "Please provide Post ID!"));
  }
  try {
    const post = await Post.findById(postId).populate("user");
    if (!post) {
      return next(errorHandler(404, "Post not found!"));
    }
    res.status(200).json({
      post,
      success: true,
      message: "Post fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const deletePost = async (req, res, next) => {
  const { postId, userId } = req.params;

  if (!userId) {
    return next(errorHandler(400, "Please provide User ID!"));
  }
  if (!postId) {
    return next(errorHandler(400, "Please provide Post ID!"));
  }
  if (!req.user.isAdmin || req.user.userId !== userId) {
    return next(errorHandler(403, "You do not have allowed to delete a post!"));
  }
  try {
    const post = await Post.findByIdAndDelete(postId);
    if (!post) {
      return next(errorHandler(404, "Post not found!"));
    }
    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const editPost = async (req, res, next) => {
  const { postId, userId } = req.params;
  if (!req.user.isAdmin || req.user.userId !== userId) {
    return next(errorHandler(403, "You do not have allowed to edit a post!"));
  }
  if (!postId) {
    return next(errorHandler(400, "Please provide Post ID!"));
  }

  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

  const newPost = {
    ...req.body,
    slug,
  };

  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      { $set: newPost },
      {
        new: true,
      }
    );
    res.status(200).json({
      post,
      success: true,
      message: "Post updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
