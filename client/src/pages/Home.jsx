import CallToAction from "@/components/CallToAction";
import PostCard from "@/components/PostCard";
import { useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { Link } from "react-router";

function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //   fetch posts
  useEffect(() => {
    setIsLoading(true);
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/get-posts?limit=9");
        if (res.ok) {
          const result = await res.json();
          if ("success" in result) {
            if (result.success) {
              setPosts(result.posts);
              setIsLoading(false);
            }
          }
        }
        setIsLoading(false);
      } catch (error) {
        return error;
      }
    };

    fetchPosts();
  }, []);

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
    <div className=" ">
      <div className="flex flex-col gap-6 p-10  px-3 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl">Welcome to my Blog</h1>
        <p className="text-gray-500 text-xs sm:text-sm ">
          Welcome to my blog! Here you'll find a wide range of articles,
          tutorials, and resources designed to help you grow as a developer.
          Whether you're interested in web development, software engineering,
          programming languages, or best practices in the tech industry, there's
          something here for everyone. Dive in and explore the content to expand
          your knowledge and skills.
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          View all posts
        </Link>
        <div className=" p-3 bg-amber-100 dark:bg-slate-700">
          <CallToAction />
        </div>
      </div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts?.length && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 justify-around ">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to="/search"
              className="text-xs sm:text-sm text-teal-500 font-bold text-center hover:underline"
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
