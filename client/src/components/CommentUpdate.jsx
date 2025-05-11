import { BiSolidLike } from "react-icons/bi";

export default function CommentUpdate({ comment, currentUser }) {
  return (
    <div className="flex gap-2 items-center border-t-2 border-gray-300/50 pt-1 mt-2">
      <BiSolidLike className="cursor-pointer" />
      <p className="text-sm text-gray-500">{comment.likes} Likes</p>
      {comment.userId._id === currentUser._id && (
        <div className="flex gap-2">
          <button>
            <p className="text-sm text-gray-500 cursor-pointer hover:underline">
              Edit
            </p>
          </button>
          <button className="text-sm text-gray-500 hover:text-red-500/80  cursor-pointer hover:underline">
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
