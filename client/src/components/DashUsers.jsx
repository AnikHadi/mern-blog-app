import { deleteProfile, getAllUsers } from "@/utils/action/userAction";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ConfirmDialog from "./ConfirmDialog";
import { Dialog, DialogTrigger } from "./ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export default function DashUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [delLoading, setDelLoading] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all user Data in the Database
  useEffect(() => {
    const singlePost = async () => {
      setIsLoading(true);
      const result = await getAllUsers();
      if ("success" in result) {
        if (result.success) {
          setAllUsers(result.users);
          if (result.users.length < 9) {
            setShowMore(false);
          } else {
            setShowMore(true);
          }
          setIsLoading(false);
        } else {
          toast.error(result.message);
          setIsLoading(false);
        }
      }
    };
    if (currentUser.isAdmin) {
      singlePost();
    }
  }, [currentUser.isAdmin]);

  // Function to handle the "Show More" button click
  const handleShowMore = async () => {
    const startIndex = allUsers.length;
    const users = await getAllUsers(startIndex);
    if (users.success) {
      setAllUsers((prevUser) => [...prevUser, ...users.users]);
      if (users.users.length < 2) {
        setShowMore(false);
      } else {
        setShowMore(true);
      }
    } else {
      toast.error(users.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    setDelLoading(true);
    const result = await deleteProfile(userId);
    if ("success" in result) {
      if (result.success) {
        toast.success(result.message);
        setAllUsers(allUsers.filter((user) => user._id !== userId));
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
          {allUsers.length > 0 && (
            <>
              <div className="container mx-auto p-4 ">
                <div className="grid grid-cols-1 gap-4 mt-4">
                  {/*  md:grid-cols-2 lg:grid-cols-3 */}
                  <div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="uppercase">
                            Date Created
                          </TableHead>
                          <TableHead className="uppercase">
                            User Image
                          </TableHead>
                          <TableHead className="uppercase">User Name</TableHead>
                          <TableHead className="uppercase">Email</TableHead>
                          <TableHead className="uppercase">Admin</TableHead>
                          <TableHead className="uppercase">Delete</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {allUsers.map((user) => {
                          const createdAt = new Date(
                            user.createdAt
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          });

                          return (
                            <TableRow
                              key={user._id}
                              className="hover:bg-gray-100 dark:hover:bg-gray-600 "
                            >
                              <TableCell className="text-sm font-medium text-gray-900 dark:text-gray-400 whitespace-nowrap">
                                {createdAt}
                              </TableCell>
                              <TableCell className="text-sm font-medium text-gray-900 dark:text-gray-400 whitespace-nowrap">
                                <img
                                  src={user.avatar}
                                  alt={user.username}
                                  className="w-10 h-10 object-cover rounded-full"
                                />
                              </TableCell>
                              <TableCell className="text-sm font-medium text-gray-900 dark:text-gray-400 whitespace-nowrap">
                                {user.username}
                              </TableCell>
                              <TableCell className="text-sm font-medium text-gray-900 dark:text-gray-400 whitespace-nowrap">
                                {user.email}
                              </TableCell>
                              <TableCell className="text-sm font-medium text-gray-900 dark:text-gray-400 whitespace-nowrap">
                                {user.isAdmin ? (
                                  <span className="text-green-500">Admin</span>
                                ) : (
                                  <span className="text-red-500">User</span>
                                )}
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
                                    description={`Are you sure you want to delete this "${user.username}" user?`}
                                    btnName="Delete Post"
                                    onClick={() => handleDeleteUser(user._id)}
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
