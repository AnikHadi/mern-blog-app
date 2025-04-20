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

  // const filter = { slug: req.body.category };
  // const category = await category.findOne(filter).select({ __v: 0 });

  const newPost = new Post({
    ...req.body,
    // category: category._id,
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
  // const skip = (page - 1) * limit;
  const startIndex = parseInt(req.query.startIndex) || 0; // Default to 0 if not provided
  const limit = parseInt(req.query.limit) || 9; // Default to 9 posts per page
  const sortDirection = req.query.order === "asc" ? 1 : -1; // Default to descending order

  const filter = {
    ...(userId && { userId: userId }),
    ...(category && { category: category }),
    ...(slug && { category: slug }),
    ...(postId && { postId: postId }),
    ...(searchTerm && {
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { content: { $regex: searchTerm, $options: "i" } },
      ],
    }),
  };

  try {
    const posts = await Post.find(filter)
      .populate("user", "category")
      .skip(startIndex)
      .limit(limit)
      .sort({ updatedAt: sortDirection });

    const totalPosts = await Post.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
    const recentPosts = await Post.find({
      createdAt: { $gte: oneMonthAgo },
    }).countDocuments();

    res.status(200).json({
      posts,
      totalPosts,
      recentPosts,
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
