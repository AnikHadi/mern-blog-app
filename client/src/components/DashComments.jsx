import { deleteComment, getAllComment } from "@/utils/action/commentAction";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ConfirmDialog from "./ConfirmDialog";
import ToolTipComponent from "./ToolTipComponent";
import { Dialog, DialogTrigger } from "./ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export default function DashComments() {
  const [allComments, setAllComments] = useState([]);
  const [delLoading, setDelLoading] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all Comment Data in the Database
  useEffect(() => {
    const fetchAllComment = async () => {
      setIsLoading(true);
      const result = await getAllComment();
      console.log(result);
      if ("success" in result && result.success) {
        setAllComments(result.comments);
        if (result.totalComments <= 9) {
          setShowMore(false);
        } else {
          setShowMore(true);
        }
        setIsLoading(false);
      } else {
        toast.error(result.message);
        setIsLoading(false);
      }
    };
    if (currentUser.isAdmin) {
      fetchAllComment();
    }
  }, [currentUser.isAdmin]);

  // Function to handle the "Show More" button click
  const handleShowMore = async () => {
    const startIndex = allComments.length;
    const comments = await getAllComment(startIndex);
    if (comments.success) {
      setAllComments((prevUser) => [...prevUser, ...comments.comments]);
      if (comments.comments.length <= 9) {
        setShowMore(false);
      } else {
        setShowMore(true);
      }
    } else {
      toast.error(comments.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    setDelLoading(true);
    const result = await deleteComment(commentId);
    if ("success" in result) {
      if (result.success) {
        toast.success(result.message);
        setAllComments(
          allComments.filter((comment) => comment._id !== commentId)
        );
      } else {
        toast.error(result.message);
      }
    }
    setDelLoading(false);
  };

  return !isLoading ? (
    <div>
      {currentUser.isAdmin && (
        <>
          {allComments.length > 0 && (
            <>
              <div className="container mx-auto p-4 ">
                <div className="grid grid-cols-1 gap-4 mt-4">
                  {/*  md:grid-cols-2 lg:grid-cols-3 */}
                  <div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="uppercase">
                            Date Update
                          </TableHead>
                          <TableHead className="uppercase">
                            Comment Content
                          </TableHead>
                          <TableHead className="uppercase">
                            NO of Likes
                          </TableHead>
                          <TableHead className="uppercase">
                            Post Title
                          </TableHead>
                          <TableHead className="uppercase">User</TableHead>
                          <TableHead className="uppercase">Delete</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {allComments.map((comment) => {
                          const updatedAt = new Date(
                            comment.updatedAt
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          });

                          return (
                            <TableRow
                              key={comment._id}
                              className="hover:bg-gray-100 dark:hover:bg-gray-600 "
                            >
                              <TableCell className="text-sm font-medium text-gray-900 dark:text-gray-400 whitespace-nowrap">
                                {updatedAt}
                              </TableCell>
                              <TableCell className="text-sm font-medium text-gray-900 dark:text-gray-400 whitespace-nowrap">
                                <ToolTipComponent
                                  data={comment.comment}
                                  length={30}
                                />
                              </TableCell>
                              <TableCell className="text-sm font-medium text-gray-900 dark:text-gray-400 whitespace-nowrap">
                                {comment.numberOfLikes}
                              </TableCell>
                              <TableCell className="text-sm font-medium text-gray-900 dark:text-gray-400 whitespace-nowrap">
                                <ToolTipComponent
                                  data={comment?.postId?.title}
                                  length={30}
                                />
                              </TableCell>
                              <TableCell className="text-sm font-medium text-gray-900 dark:text-gray-400 whitespace-nowrap">
                                {comment?.userId?.username}
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
                                    description={`Are you sure you want to delete this comment?`}
                                    btnName="Yes, I'm sure"
                                    onClick={() =>
                                      handleDeleteComment(comment._id)
                                    }
                                  />
                                </Dialog>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
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
          )}
        </>
      )}
    </div>
  ) : (
    <div className="flex gap-4 items-center justify-center min-h-[calc(100vh-271px)]">
      <ImSpinner9 className="animate-spin text-4xl " />
      <div className="text-5xl font-bold bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-16">
        Loading...
      </div>
    </div>
  );
}
