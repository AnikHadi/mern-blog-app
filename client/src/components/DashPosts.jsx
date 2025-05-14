import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deletePost, getPost } from "@/utils/action/postAction";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { toast } from "react-toastify";
import ConfirmDialog from "./ConfirmDialog";
import ToolTipComponent from "./ToolTipComponent";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";

export default function DashPosts() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [userPost, setUserPost] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [delLoading, setDelLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch posts from the server when the component mounts

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const posts = await getPost(currentUser._id);
      if (posts.success) {
        setUserPost(posts.posts);
        if (posts.posts.length < 9) {
          setShowMore(false);
        } else {
          setShowMore(true);
        }
        setIsLoading(false);
      } else {
        toast.error(posts.message);
        setIsLoading(false);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser]);

  // Function to handle the "Show More" button click
  const handleShowMore = async () => {
    const startIndex = userPost.length;
    const posts = await getPost(currentUser._id, startIndex);
    if (posts.success) {
      setUserPost((prevPosts) => [...prevPosts, ...posts.posts]);
      if (posts.posts.length < 9) {
        setShowMore(false);
      } else {
        setShowMore(true);
      }
    } else {
      toast.error(posts.message);
    }
  };

  // Function to delete a post
  const handleDeletePost = async (postId) => {
    setDelLoading(true);
    const result = await deletePost(postId, currentUser._id);
    if ("success" in result) {
      if (result.success) {
        setUserPost((prevPosts) => {
          if (prevPosts.length <= 9) {
            setShowMore(false);
          } else {
            setShowMore(true);
          }
          return prevPosts.filter((post) => post._id !== postId);
        });
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    }
    setDelLoading(false);
  };

  return !isLoading ? (
    <div>
      {currentUser.isAdmin && (
        <div className="container mx-auto p-4 ">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Your Posts</h1>
            <Link to="/create-post">
              <Button className="bg-blue-500 text-white px-4 py-1.5 rounded-lg hover:bg-blue-600 cursor-pointer">
                Create New Post
              </Button>
            </Link>
          </div>
          {userPost.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-4 mt-4">
                {/*  md:grid-cols-2 lg:grid-cols-3 */}
                <div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="uppercase">Date Update</TableHead>
                        <TableHead className="uppercase">Post Image</TableHead>
                        <TableHead className="uppercase">Post Title</TableHead>
                        <TableHead className="uppercase">Category</TableHead>
                        <TableHead className="uppercase">Delete</TableHead>
                        <TableHead className="uppercase">
                          <span>Edit</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userPost.map((post) => {
                        const updatedAt = new Date(
                          post.updatedAt
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        });

                        return (
                          <TableRow
                            key={post._id}
                            className="hover:bg-gray-100 dark:hover:bg-gray-600 "
                          >
                            <TableCell className="text-sm font-medium text-gray-900 dark:text-gray-400 whitespace-nowrap">
                              {updatedAt}
                            </TableCell>
                            <TableCell className="text-sm font-medium text-gray-900 dark:text-gray-400 whitespace-nowrap">
                              <img
                                src={post.image}
                                alt={post.title}
                                className="w-20 h-10 object-cover rounded-md"
                              />
                            </TableCell>
                            <TableCell className="text-sm font-medium text-gray-900 dark:text-gray-400 whitespace-nowrap">
                              <Link to={`/post/${post.slug}`}>
                                <ToolTipComponent
                                  data={post.title}
                                  length={80}
                                />
                              </Link>
                            </TableCell>
                            <TableCell className="text-sm font-medium text-gray-900 dark:text-gray-400 whitespace-nowrap">
                              {post.category}
                            </TableCell>
                            <TableCell className=" text-sm font-medium   text-gray-900 dark:text-gray-400 whitespace-nowrap ">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <button disabled={delLoading}>
                                    <FaTrashAlt className="w-4 h-4 ml-4 cursor-pointer text-red-400 hover:text-red-500" />
                                  </button>
                                </DialogTrigger>
                                <ConfirmDialog
                                  title={"Confirm Delete"}
                                  description={`Are you sure you want to delete this "${post.title}" post?`}
                                  btnName="Delete Post"
                                  onClick={() => handleDeletePost(post._id)}
                                />
                              </Dialog>
                            </TableCell>
                            <TableCell className="text-sm font-medium text-gray-900 whitespace-nowrap">
                              <Link
                                to={`/update-post/${post._id}`}
                                className="cursor-pointer text-teal-500 hover:text-teal-600"
                              >
                                <span>Edit</span>
                              </Link>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
              {showMore && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={handleShowMore}
                    className="bg-blue-500 text-white px-4 py-1.5 rounded-lg hover:bg-blue-600 cursor-pointer"
                  >
                    Show More
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-screen">
              <h1 className="text-2xl font-bold">No Posts Found</h1>
              <p className="text-gray-500">You can create a new post.</p>
            </div>
          )}
        </div>
      )}
    </div>
  ) : (
    <div className="flex gap-4 items-center justify-center min-h-[calc(100vh-271px)]">
      <ImSpinner9 className="animate-spin text-4xl  " />
      <div className="text-5xl font-bold bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-16">
        Loading...
      </div>
    </div>
  );
}
