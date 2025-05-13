import Comment from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js";

export const createComment = async (req, res, next) => {
  const { postId, userId } = req.params;

  if (!req.user.isAdmin || !req.user._id === userId) {
    return next(errorHandler(403, "You do not have allowed to create a post!"));
  }
  if (!postId) {
    return next(errorHandler(400, "Post ID is required"));
  }
  if (!req.body.comment) {
    return next(errorHandler(400, "Comment is required"));
  }

  const newComment = new Comment({
    ...req.body,
    postId,
    userId,
  });

  try {
    const savedComment = await newComment.save();
    await savedComment.populate("userId", ["username", "avatar"]);
    res.status(201).json({
      comment: savedComment,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const getComments = async (req, res, next) => {
  const { postId } = req.params;

  if (!postId) {
    return next(errorHandler(400, "Post ID is required"));
  }

  try {
    const comments = await Comment.find({ postId })
      .populate("userId", ["username", "avatar"])
      .sort({ createdAt: -1 });

    const totalComments = await Comment.countDocuments({ postId });

    res.status(200).json({
      comments,
      totalComments,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const likeComment = async (req, res, next) => {
  const { commentId } = req.params;
  const userId = req.user.userId;

  if (!userId) {
    return next(errorHandler(403, "You do not have allowed to like a post!"));
  }

  if (!commentId) {
    return next(errorHandler(400, "Comment ID is required"));
  }

  try {
    const comment = await Comment.findById(commentId).populate("userId", [
      "username",
      "avatar",
    ]);

    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }

    const userIndex = comment.likes.indexOf(userId);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(userId);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    res.status(200).json({
      comment,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const editComment = async (req, res, next) => {
  const { commentId } = req.params;
  const userId = req.user.userId;

  if (!commentId) {
    return next(errorHandler(400, "Comment ID is required"));
  }

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }

    if (!req.user.isAdmin || comment.userId.toString() !== userId) {
      return next(errorHandler(403, "You do not have allowed to edit a post!"));
    }

    const editedComment = await Comment.findByIdAndUpdate(
      commentId,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      comment: editedComment,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  const { commentId } = req.params;
  const userId = req.user.userId;

  if (!commentId) {
    return next(errorHandler(400, "Comment ID is required"));
  }

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }

    if (!req.user.isAdmin || comment.userId.toString() !== userId) {
      return next(errorHandler(403, "You do not have allowed to edit a post!"));
    }

    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
