import { getAllUsers } from "@/utils/action/userAction";
import { useEffect, useState } from "react";
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { ImSpinner9 } from "react-icons/im";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import ToolTipComponent from "./ToolTipComponent";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export default function DashboardComponent() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);

  //   fetch users
  useEffect(() => {
    setIsLoading(true);
    const fetchUsers = async () => {
      const result = await getAllUsers(0, 5);
      if ("success" in result) {
        if (result.success) {
          setUsers(result.users);
          setTotalUsers(result.totalUsers);
          setLastMonthUsers(result.lastMonthUsers);

          setIsLoading(false);
        }
      }
      setIsLoading(false);
    };

    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser.isAdmin]);

  //   fetch posts
  useEffect(() => {
    setIsLoading(true);
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/get-posts?limit=5");
        if (res.ok) {
          const result = await res.json();
          if ("success" in result) {
            if (result.success) {
              setPosts(result.posts);
              setTotalPosts(result.totalPosts);
              setLastMonthPosts(result.lastMonthPosts);
              setIsLoading(false);
            }
          }
        }
        setIsLoading(false);
      } catch (error) {
        return error;
      }
    };

    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser.isAdmin]);

  //   fetch comments
  useEffect(() => {
    setIsLoading(true);

    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comment/getAllComments?limit=5");
        if (res.ok) {
          const result = await res.json();
          if ("success" in result) {
            if (result.success) {
              setComments(result.comments);
              setTotalComments(result.totalComments);
              setLastMonthComments(result.lastMonthComments);
              setIsLoading(false);
            }
          }
        }
        setIsLoading(false);
      } catch (error) {
        return error;
      }
    };

    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser.isAdmin]);

  if (isLoading) {
    return (
      <div className="flex gap-4 items-center justify-center min-h-[calc(100vh-271px)]">
        <ImSpinner9 className="animate-spin text-4xl " />
        <div className="text-5xl font-bold bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-16">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 md:mx-auto">
      <div className="flex-wrap flex gap-4 justify-center">
        {/* User Section */}
        <div className="flex flex-col gap-4 p-3 dark:bg-slate-800 md:w-72 w-full rounded-md shadow-lg">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 text-base uppercase">Total Users</h3>
              <p className="text-2xl">{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex flex-col text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>

        {/*Comment Section  */}
        <div className="flex flex-col gap-4 p-3 dark:bg-slate-800 md:w-72 w-full rounded-md shadow-lg">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 text-base uppercase">
                Total Comments
              </h3>
              <p className="text-2xl">{totalComments}</p>
            </div>
            <HiAnnotation className="bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex flex-col text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthComments}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>

        {/*Post Section  */}
        <div className="flex flex-col gap-4 p-3 dark:bg-slate-800 md:w-72 w-full rounded-md shadow-lg">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 text-base uppercase">Total Posts</h3>
              <p className="text-2xl">{totalPosts}</p>
            </div>
            <HiDocumentText className="bg-lime-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex flex-col text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthPosts}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
      </div>
      {/* grid grid-cols-5 */}
      <div className="flex flex-wrap gap-4 justify-center py-3 mx-auto w-fit ">
        {/* User   col-span-2 */}
        <div className="flex flex-col w-full md:w-auto shadow-md rounded-md p-2 dark:bg-slate-800 ">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Users</h1>

            <button className="transition group flex items-center justify-center text-white font-bold rounded-md p-[1.5px] bg-gradient-to-br from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 cursor-pointer mt-[1px] mr-[1px]">
              <Link
                to="/dashboard?tab=users"
                className="flex justify-center items-center w-full h-full rounded-md text-gray-900 dark:text-gray-100 hover:text-gray-100  bg-white dark:bg-[#10172a]  py-[6px] px-3 bg-gradient-to-br hover:from-pink-600 hover:to-purple-600"
              >
                See all
              </Link>
            </button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="uppercase">User Image</TableHead>
                <TableHead className="uppercase">User Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.length ? (
                users.map((user) => {
                  return (
                    <TableRow
                      key={user._id}
                      className=" hover:bg-gray-200 dark:hover:bg-gray-600 "
                    >
                      <TableCell className="">
                        <img
                          src={user.avatar}
                          alt={user.username}
                          className="w-10 h-10 object-cover rounded-full"
                        />
                      </TableCell>
                      <TableCell>{user.username}</TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <div className="flex justify-center items-center p-3">
                  No Users Found
                </div>
              )}
            </TableBody>
          </Table>
        </div>
        {/* Comment  col-span-3 */}
        <div className="flex flex-col  w-full md:w-auto shadow-md rounded-md p-2 dark:bg-slate-800 ">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Comments</h1>

            <button className="transition group flex items-center justify-center text-white font-bold rounded-md p-[1.5px] bg-gradient-to-br from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 cursor-pointer mt-[1px] mr-[1px]">
              <Link
                to="/dashboard?tab=comments"
                className="flex justify-center items-center w-full h-full rounded-md text-gray-900 dark:text-gray-100 hover:text-gray-100  bg-white dark:bg-[#10172a]  py-[6px] px-3 bg-gradient-to-br hover:from-pink-600 hover:to-purple-600"
              >
                See all
              </Link>
            </button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="uppercase">Comment Content</TableHead>
                <TableHead className="uppercase">Likes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comments?.length ? (
                comments.map((comment) => {
                  return (
                    <TableRow
                      key={comment._id}
                      className=" hover:bg-gray-200 dark:hover:bg-gray-600 "
                    >
                      <TableCell className="w-95">
                        <ToolTipComponent data={comment.comment} length={50} />
                      </TableCell>
                      <TableCell className="w-5">
                        {comment.numberOfLikes}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <div className="flex justify-center items-center p-3">
                  No Comment Found
                </div>
              )}
            </TableBody>
          </Table>
        </div>
        {/* Post      col-span-4 items-center */}
        <div className="flex flex-col w-full md:w-auto shadow-md rounded-md p-2 dark:bg-slate-800 ">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Posts</h1>

            <button className="transition group flex items-center justify-center text-white font-bold rounded-md p-[1.5px] bg-gradient-to-br from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 cursor-pointer mt-[1px] mr-[1px]">
              <Link
                to="/dashboard?tab=posts"
                className="flex justify-center items-center w-full h-full rounded-md text-gray-900 dark:text-gray-100 hover:text-gray-100  bg-white dark:bg-[#10172a]  py-[6px] px-3 bg-gradient-to-br hover:from-pink-600 hover:to-purple-600"
              >
                See all
              </Link>
            </button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="uppercase">Post Image</TableHead>
                <TableHead className="uppercase">Post Title</TableHead>
                <TableHead className="uppercase">Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts?.length ? (
                posts.map((post) => {
                  return (
                    <TableRow
                      key={post._id}
                      className=" hover:bg-gray-200 dark:hover:bg-gray-600 "
                    >
                      <TableCell className="">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-10 h-10 object-cover rounded-full"
                        />
                      </TableCell>
                      <TableCell>
                        <ToolTipComponent data={post.title} length={55} />
                      </TableCell>
                      <TableCell>{post.category}</TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <div className="flex justify-center items-center p-3">
                  No Post Found
                </div>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

//  text-white
