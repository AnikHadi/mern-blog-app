import moment from "moment";
import { BiSolidLike } from "react-icons/bi";

export default function CommentUpdate({ comment, currentUser }) {
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
          <BiSolidLike className="cursor-pointer transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110" />
          <p className="text-xs text-gray-500">{comment.likes} Likes</p>
          {comment.userId._id === currentUser._id && (
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
