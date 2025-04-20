import { getPost } from "@/utils/action/postAction";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function DashPosts() {
  const [posts, setPosts] = useState([]);
  // Fetch posts from the server when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPost(1, 9, "", "");
      if (posts.success) {
        setPosts(posts.posts);
      } else {
        toast.error(posts.message);
      }
    };
    fetchPosts();
  }, []);

  //   Video Time Stamp: 6:40:36
  console.log(posts);

  return <div>DashPosts</div>;
}
