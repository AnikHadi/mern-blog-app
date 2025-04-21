import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getPost } from "@/utils/action/postAction";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { toast } from "react-toastify";

export default function DashPosts() {
  const currentUser = useSelector((state) => state.user.currentUser);
  // const counterRef = useRef();
  const [posts, setPosts] = useState([]);

  // Fetch posts from the server when the component mounts
  useEffect(() => {
    const userId = currentUser._id;
    const category = "";
    const slug = "";
    const postId = "";
    const searchTerm = "";
    const fetchPosts = async () => {
      const posts = await getPost(userId, category, slug, postId, searchTerm);
      if (posts.success) {
        setPosts(posts.posts);
      } else {
        toast.error(posts.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id, currentUser.isAdmin]);

  return (
    <div>
      {currentUser.isAdmin && posts.length > 0 ? (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold">Your Posts</h1>
          <div className="grid grid-cols-1 gap-4 mt-4">
            {/*  md:grid-cols-2 lg:grid-cols-3 */}
            <div className="rounded-md border ">
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
                  {posts.map((post) => {
                    // const createdAt = new Date(
                    //   post.createdAt
                    // ).toLocaleDateString("en-US", {
                    //   year: "numeric",
                    //   month: "long",
                    //   day: "numeric",
                    // });
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
                          {post.title}
                        </TableCell>
                        <TableCell className="text-sm font-medium text-gray-900 dark:text-gray-400 whitespace-nowrap">
                          {post.category}
                        </TableCell>
                        <TableCell className=" text-sm font-medium   text-gray-900 dark:text-gray-400 whitespace-nowrap ">
                          <FaTrashAlt className="w-4 h-4 ml-4 cursor-pointer text-red-400 hover:text-red-500" />
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
          <div className="flex justify-center mt-4">
            <button className="bg-blue-500 text-white px-4 py-1.5 rounded-lg hover:bg-blue-600 cursor-pointer">
              Show More
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold">No Posts Found</h1>
          <p className="text-gray-500">You can create a new post.</p>
        </div>
      )}
    </div>
  );
}
