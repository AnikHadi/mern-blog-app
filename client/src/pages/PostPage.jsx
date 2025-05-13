import CallToAction from "@/components/CallToAction";
import CommentSection from "@/components/CommentSection";
import PostCard from "@/components/PostCard";
import { getPost } from "@/utils/action/postAction";
import { useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { Link, useParams } from "react-router";
import { toast } from "react-toastify";

export default function PostPage() {
  const { postSlug } = useParams();
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const post = await getPost("", 0, "", postSlug);
        setPost(post.posts[0]);
        setIsLoading(false);
      } catch (error) {
        toast.error(error.message);
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  //  get recent posts
  useEffect(() => {
    const fetchRecentPosts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/post/get-posts?limit=3`);
        if (!res.ok) {
          return;
        }
        const data = await res.json();
        setRecentPosts(data.posts);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchRecentPosts();
  }, []);

  return !isLoading ? (
    <main className="container mx-auto p-3 flex flex-col min-h-[calc(100vh-271px)]">
      <h1 className="text-3xl mt-10 p-3 line-clamp-2 leading-12 text-center max-w-2xl mx-auto lg:text-4xl">
        {post?.title}
      </h1>
      <Link
        to={`/search?category=${post?.category}`}
        className=" w-fit self-center mt-5"
      >
        <button className="btn">{post?.category}</button>
      </Link>
      <img
        src={post?.image}
        alt={post?.title}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />

      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>{post && new Date(post?.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && (post?.content?.length / 1000).toFixed(0)} mins read
        </span>
      </div>

      <div
        dangerouslySetInnerHTML={{ __html: post?.content }}
        className="p-3 max-w-2xl mx-auto w-full post-content"
      />
      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>
      <CommentSection postId={post._id} />

      <div className="flex flex-col justify-center items-center mb-10">
        <h1 className="text-xl mt-5">Recent articles</h1>
        <div className=" flex flex-wrap gap-4 justify-center mt-5">
          {recentPosts.length > 0 &&
            recentPosts?.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </main>
  ) : (
    <div className="flex gap-4 items-center justify-center min-h-[calc(100vh-271px)]">
      <ImSpinner9 className="animate-spin text-4xl  " />
      <div className="text-5xl font-bold bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-16">
        Loading...
      </div>
    </div>
  );
}
