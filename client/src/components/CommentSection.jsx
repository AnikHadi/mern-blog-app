import { createComment, getAllComment } from "@/utils/action/commentAction";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { toast } from "react-toastify";
import CommentUpdate from "./CommentUpdate";

export default function CommentSection({ postId }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [comments, setComments] = useState("");
  const [allComments, setAllComments] = useState([]);

  // fetch all comments
  useEffect(() => {
    if (postId) {
      const fetchComments = async () => {
        const data = await getAllComment(postId);
        if (data.success) {
          setAllComments(data.comments);
        } else {
          toast.error(data.message);
        }
      };
      fetchComments();
    }
  }, [postId]);

  // console.log(allComments);

  // handle enter key to submit comment
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleSubmit();
      }
    };

    const textarea = document.querySelector("textarea");
    if (textarea) {
      textarea.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (textarea) {
        textarea.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [comments]);

  // handle submit comment
  const handleSubmit = async () => {
    if (comments.length < 1) return;

    const data = {
      comment: comments,
    };
    const userId = currentUser._id;
    const comment = await createComment(data, postId, userId);
    if (comment.success) {
      setAllComments((prev) => [comment.comment, ...prev]);
      setComments("");
      console.log(comment);
    } else {
      toast.error(comment.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex justify-between items-center   gap-3">
          <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
            <p>Sign in as:</p>
            <img
              src={currentUser.avatar}
              alt={currentUser.username}
              className="h-5 w-5 object-cover rounded-full"
            />
            <Link
              to={`/dashboard?tab=profile`}
              className="text-cyan-600 hover:underline "
            >
              @{currentUser.username}
            </Link>
          </div>
          {currentUser?.isAdmin && (
            <Link
              to={`/dashboard?tab=posts`}
              className=" text-cyan-600 hover:underline text-sm"
            >
              Go to Post Page
            </Link>
          )}
        </div>
      ) : (
        <div className="flex gap-2 my-5 text-gray-500 text-sm">
          You must be signed in to comment.
          <Link to={`/sign-in`} className="text-cyan-500 hover:underline ">
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          action={handleSubmit}
          className="border-2 border-teal-400 rounded-lg p-3"
        >
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Write a comment..."
            rows="3"
            maxLength="200"
            onChange={(e) => {
              setComments(e.target.value);
            }}
            value={comments}
          ></textarea>
          <div className="flex justify-between items-center mt-2">
            <span className="text-gray-500 text-xs">
              {200 - comments?.length} Characters remaining
            </span>
            <button
              className="border-2 border-teal-400 text-black dark:text-white px-4 py-1 rounded-md hover:bg-cyan-600 hover:text-white cursor-pointer"
              type="submit"
            >
              Comment
            </button>
          </div>
        </form>
      )}
      <div>
        {allComments?.length > 0 ? (
          <div>
            <div>
              <h2 className="text-2xl font-bold my-5">Comments</h2>
              <p className="text-gray-500 text-sm">
                {allComments.length} Comments
              </p>
            </div>
            <div>
              {allComments.map((comment) => (
                <CommentUpdate
                  key={comment._id}
                  comment={comment}
                  currentUser={currentUser}
                  setAllComments={setAllComments}
                />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No comments yet</p>
        )}
      </div>
    </div>
  );
}
