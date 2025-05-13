import { likeComment } from "@/utils/action/commentAction";
import moment from "moment";
import { BiSolidLike } from "react-icons/bi";
import { toast } from "react-toastify";

export default function CommentUpdate({
  comment,
  currentUser,
  setAllComments,
}) {
  // const handleDelete = async () => {
  // Implement delete functionality here
  // };
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
            console.log(c);
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

  const userLike = currentUser && comment.likes.includes(currentUser._id);

  return (
    <div className="flex gap-4 items-center my-5 pb-3 border-b border-gray-400/50">
      <img
        src={comment.userId.avatar}
        alt={comment.userId.username}
        className="h-10 w-10 object-cover rounded-full"
      />
      <div>
        <div className="flex gap-2 items-center">
          <p className="text-cyan-700 text-xs">@{comment.userId.username}</p>
          <p className="text-xs text-gray-500">
            {moment(comment.createdAt).fromNow()}
          </p>
        </div>
        <p className="text-sm">{comment.comment}</p>

        <div className="flex gap-2 items-center border-t-2 border-gray-300/50 pt-1 mt-2 text-xs">
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
          {comment?.userId._id === currentUser?._id && (
            <div className="flex gap-2 text-xs">
              <button>
                <p className=" text-gray-500 cursor-pointer hover:underline">
                  Edit
                </p>
              </button>
              <button className=" text-gray-500 hover:text-red-500/80  cursor-pointer hover:underline">
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// comment?.numberOfLikes > 1 ? " Likes" : " Like"
