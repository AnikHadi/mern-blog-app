import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCategories } from "@/utils/action/categoryAction";
import { useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { useLocation, useNavigate } from "react-router";

export default function Search() {
  const [sideBarData, setSideBarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });
  const [posts, setPosts] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTerm = urlParams.get("search");
    const sort = urlParams.get("sort");
    const category = urlParams.get("category");

    if (searchTerm || sort || category) {
      setSideBarData((prev) => ({
        ...prev,
        searchTerm: searchTerm,
        sort: sort || prev.sort,
        category: category || prev.category,
      }));
    }

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/post/get-posts?${searchQuery}&limit=9`);
        if (res.ok) {
          const result = await res.json();
          if ("success" in result) {
            if (result.success) {
              setPosts(result.posts);
              setLoading(false);
              if (result.totalPosts > 9) {
                setShowMore(true);
              } else {
                setShowMore(false);
              }
            }
          }
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        return error;
      }
    };
    fetchPosts();
  }, [location.search]);

  useEffect(() => {
    setLoading(true);
    const fetchCategories = async () => {
      try {
        const result = await getAllCategories();

        if ("success" in result && result.success) {
          setAllCategory(result.categories);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        return error;
      }
    };
    fetchCategories();
  }, []);

  console.log(sideBarData);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("search", sideBarData.searchTerm);
    urlParams.set("sort", sideBarData.sort);
    urlParams.set("category", sideBarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/post/get-posts?${searchQuery}`);
        if (res.ok) {
          const result = await res.json();
          if ("success" in result && result.success) {
            setPosts((prev) => [...prev, ...result.posts]);
            setLoading(false);
            if (result.posts.length > 9) {
              setShowMore(true);
            } else {
              setShowMore(false);
            }
          }
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        return error;
      }
    };
    fetchPosts();
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 ">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form onSubmit={handleSubmit} className="flex flex-col w-[240px] gap-8">
          <div className="grid grid-cols-4 gap-4 items-center">
            <Label
              htmlFor="search"
              className="whitespace-nowrap font-semibold col-span-1"
            >
              Search
            </Label>
            <Input
              placeholder="Search..."
              type="text"
              id="search"
              className="col-span-3"
              value={sideBarData.searchTerm}
              onChange={(e) =>
                setSideBarData((prev) => ({
                  ...prev,
                  searchTerm: e.target.value,
                }))
              }
            />
          </div>
          <div className="grid grid-cols-4  gap-4 items-center">
            <Label
              htmlFor="sort"
              className="whitespace-nowrap font-semibold col-span-1"
            >
              Sort
            </Label>
            <Select
              name="sort"
              id="sort"
              className="cursor-pointer col-span-3"
              onValueChange={(e) => {
                setSideBarData((prev) => ({ ...prev, sort: e }));
              }}
              value={sideBarData?.sort}
            >
              <SelectTrigger className="w-full col-span-3 cursor-pointer">
                <SelectValue placeholder="Select Order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="cursor-pointer" value="desc">
                  Latest
                </SelectItem>
                <SelectItem className="cursor-pointer" value="ase">
                  Oldest
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 gap-4 items-center">
            <Label
              htmlFor="search"
              className="whitespace-nowrap font-semibold col-span-1"
            >
              Category
            </Label>
            <Select
              name="category"
              className="col-span-3"
              onValueChange={(e) => {
                setSideBarData((prev) => ({ ...prev, category: e }));
              }}
              value={sideBarData?.category}
            >
              <SelectTrigger className="w-full col-span-3 cursor-pointer">
                <SelectValue placeholder="Select a Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="cursor-pointer" value="all">
                  All
                </SelectItem>
                {allCategory.map((category) => {
                  return (
                    <SelectItem
                      className="cursor-pointer"
                      key={category._id}
                      value={category.slug}
                    >
                      {category.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <Button
            type="submit"
            className="bg-gradient-to-br from-violet-700 to-pink-700 hover:from-pink-700 hover:to-violet-700 text-white cursor-pointer"
          >
            Apply Filter
          </Button>
        </form>
      </div>
      <div className="w-full">
        <h1
          className="text-3xl font-semibold sm:border-b border-gray-500
         p-3 mt-5"
        >
          Post Result
        </h1>
        <div className="p-7 flex flex-wrap justify-start gap-4">
          {!loading && posts.length === 0 && <div>No Post Found!</div>}
          {loading && (
            <div className="flex gap-4 items-center justify-center min-h-[calc(100vh-271px)]">
              <ImSpinner9 className="animate-spin text-4xl " />
              <div className="text-5xl font-bold bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-16">
                Loading...
              </div>
            </div>
          )}
          {!loading &&
            posts &&
            posts?.map((post) => <PostCard key={post._id} post={post} />)}

          {showMore && (
            <button
              onClick={handleShowMore}
              className="text-teal-500 text-lg hover:underline w-full p-3 cursor-pointer"
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
