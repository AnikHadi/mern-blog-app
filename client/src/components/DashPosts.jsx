import { getPost } from "@/utils/action/postAction";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function DashPosts() {
  const currentUser = useSelector((state) => state.user.currentUser);
  console.log(currentUser);
  const [posts, setPosts] = useState([]);

  // Fetch posts from the server when the component mounts
  useEffect(() => {
    const userId = currentUser._id;
    const fetchPosts = async () => {
      const posts = await getPost(userId);
      if (posts.success) {
        setPosts(posts.posts);
      } else {
        toast.error(posts.message);
      }
    };
    fetchPosts();
  }, [currentUser._id]);

  //   Video Time Stamp: 6:40:36
  console.log(posts);

  return <div>DashPosts</div>;
}
