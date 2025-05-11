import { useSelector } from "react-redux";
import { Link } from "react-router";

export default function CommentSection({ postId }) {
  const currentUser = useSelector((state) => state.user.currentUser);

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
    </div>
  );
}
