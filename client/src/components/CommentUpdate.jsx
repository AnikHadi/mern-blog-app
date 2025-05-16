import {
  deleteComment,
  editComment,
  likeComment,
} from "@/utils/action/commentAction";
import moment from "moment";
import { useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import { toast } from "react-toastify";
import ConfirmDialog from "./ConfirmDialog";
import { Dialog, DialogTrigger } from "./ui/dialog";

export default function CommentUpdate({
  comment,
  currentUser,
  setAllComments,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.comment);
  const [isEditingComment, setIsEditingComment] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // handle like comment
  const handleLike = async () => {
    if (!currentUser) {
      toast.warning("Please login to like a comment");
      return;
    }
    const like = await likeComment(comment._id);
    if (like.success) {
      setAllComments((prev) => {
        prev.map((c) => {
          if (c._id === comment._id) {
            c.likes = like.comment.likes;
            c.numberOfLikes = like.comment.numberOfLikes;
          }
          return { ...c };
        });

        return [...prev];
      });
    } else {
      console.error("Error liking comment:", like.message);
    }
  };

  const handleEditComment = () => {
    if (!currentUser) {
      toast.warning("Please login to like a comment");
      return;
    }
    setIsEditing(true);
    setEditedComment(comment.comment);
  };

  // handel save comment
  const handleSaveComment = async (commentId) => {
    setIsEditingComment(true);
    const data = {
      comment: editedComment,
    };
    const res = await editComment(commentId, data);
    if (res.success) {
      setAllComments((prev) => {
        prev.map((c) => {
          if (c._id === comment._id) {
            c.comment = editedComment;
          }
          return { ...c };
        });

        return [...prev];
      });
      setIsEditing(false);
      setIsEditingComment(false);
      setEditedComment("");
    } else {
      setIsEditingComment(false);
      toast.error(res.message);
      console.error("Error editing comment:", res.message);
    }
  };

  // handle delete comment
  const handleDelete = async (commentId) => {
    if (!currentUser) {
      toast.warning("Please login to like a comment");
      return;
    }
    setIsDeleting(true);
    const res = await deleteComment(commentId);
    if (res.success) {
      setAllComments((prev) => {
        const newComments = prev.filter((c) => c._id !== commentId);
        return [...newComments];
      });
      setIsDeleting(false);
    } else {
      setIsDeleting(false);
      console.error("Error deleting comment:", res.message);
    }
  };

  const userLike = currentUser && comment.likes.includes(currentUser._id);

  return (
    <div className="w-full flex gap-4  my-5 pb-3 border-b border-gray-400/50">
      <img
        src={comment.userId.avatar}
        alt={comment.userId.username}
        className="h-10 w-10 object-cover rounded-full"
      />
      <div className="flex-1">
        <div className="flex gap-2 items-center">
          <p className="text-cyan-700 text-xs">@{comment.userId.username}</p>
          <p className="text-xs text-gray-500">
            {moment(comment.createdAt).fromNow()}
          </p>
        </div>

        {isEditing ? (
          <div className="flex flex-col w-full gap-2 items-center">
            <textarea
              className="w-full text-xs mt-2 p-2 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-500"
              placeholder="Write a comment..."
              maxLength="200"
              onChange={(e) => {
                setEditedComment(e.target.value);
              }}
              value={editedComment}
            />
            <div className="flex w-full gap-2 text-sm justify-end items-center">
              <button
                onClick={() => handleSaveComment(comment._id)}
                disabled={isEditingComment}
                className="bg-gradient-to-br from-purple-800 to-blue-700 hover:from-blue-700 hover:to-purple-800 text-white px-3 py-1 rounded-lg cursor-pointer"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex justify-center items-center text-white  p-[1.5px] rounded-lg  bg-gradient-to-br from-purple-800 to-blue-700 hover:from-blue-700 hover:to-purple-800 cursor-pointer"
              >
                <div className="rounded-lg text-gray-900 dark:text-gray-100 hover:text-gray-100  bg-white dark:bg-[#10172a] py-[3px] px-3 bg-gradient-to-br  hover:from-blue-700 hover:to-purple-800">
                  Cancel
                </div>
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-sm">{comment.comment}</p>
            <div className="flex gap-2 items-center w-[130px] border-t border-gray-400/50 dark:border-gray-200/20 pt-1 mt-2 text-xs">
              <BiSolidLike
                onClick={() => handleLike(comment._id)}
                className={`text-base cursor-pointer transition delay-150 duration-100 ease-in hover:-translate-y-0.2 hover:scale-150 ${
                  userLike ? "text-cyan-500" : "text-gray-500"
                }`}
              />
              <p className="text-xs text-gray-500">
                {comment?.numberOfLikes
                  ? `${comment.numberOfLikes} ${
                      comment.numberOfLikes > 1 ? "Likes" : "Like"
                    }`
                  : ""}
              </p>
              {currentUser &&
                (currentUser._id === comment.userId._id ||
                  currentUser.isAdmin) && (
                  <div className="flex gap-2 text-xs">
                    <button
                      className=" text-gray-500 cursor-pointer hover:underline"
                      onClick={() => handleEditComment(comment._id)}
                    >
                      Edit
                    </button>
                    <Dialog className=" dark:bg-[#10172a] bg-[#f9f9f9]">
                      <DialogTrigger asChild>
                        <button
                          disabled={isDeleting}
                          className=" text-gray-500 cursor-pointer hover:underline"
                        >
                          Delete
                        </button>
                      </DialogTrigger>
                      <ConfirmDialog
                        description={`Are you sure you want to delete this Comment?`}
                        btnName="Yes, I'm sure"
                        onClick={() => handleDelete(comment._id)}
                      />
                    </Dialog>
                  </div>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
