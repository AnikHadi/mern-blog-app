import { toggleTheme } from "@/redux/theme/themeSlice";
import { signOut } from "@/redux/user/userSlice";
import { signOutAction } from "@/utils/action/userAction";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { BsCloudMoonFill, BsMenuButtonWideFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";
import { IoMdLogOut, IoMdSearch } from "react-icons/io";
import { LuCloudSun } from "react-icons/lu";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  const link = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/project" },
    // { name: "Contact", path: "/contact" },
    // { name: "Dashboard", path: "/dashboard" },
  ];

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTerm = urlParams.get("search");
    if (searchTerm) {
      setSearchTerm(searchTerm);
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("search", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  // Sign Out Handler
  const handleSignOut = async () => {
    const result = await signOutAction();
    if ("success" in result) {
      if (result.success) {
        toast.success(result.message);
        dispatch(signOut());
      } else {
        toast.error("Sign out Failed.");
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-4 py-2 border-b-2">
        <Link
          to="/"
          className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
        >
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
            Hadi's
          </span>
          Blog
        </Link>

        <form onSubmit={handleSubmit}>
          <div className="w-[160%] relative items-center hidden lg:flex">
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
            />
            <Search
              size={16}
              color="#808080"
              strokeWidth={1}
              absoluteStrokeWidth
              onClick={handleSubmit}
              className="absolute right-3 opacity-50 hover:opacity-70 cursor-pointer"
            />
          </div>
        </form>

        <div className="hidden sm:flex items-center">
          {link.map((nav) => {
            return (
              <Link
                key={nav.name}
                to={nav.path}
                className={`ml-4 px-2 py-1 rounded-md ${
                  nav.path === path ? "text-cyan-700" : ""
                }`}
              >
                {nav.name}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <Button className="border-2 border-gray-400 bg-transparent hover:bg-transparent rounded-full cursor-pointer w-12 flex lg:hidden items-center">
            <IoMdSearch
              size={30}
              className="text-gray-800 dark:text-gray-200"
            />
          </Button>
          <div className="flex gap-2 md:order-2">
            <Button
              className="border-2 border-gray-400 bg-transparent hover:bg-transparent rounded-full cursor-pointer w-12 hidden sm:flex items-center "
              onClick={() => dispatch(toggleTheme())}
            >
              {theme === "light" ? (
                <LuCloudSun className="text-gray-800 " />
              ) : (
                <BsCloudMoonFill className="text-gray-200" />
              )}
            </Button>
            {currentUser?.email ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="w-10 mx-3 cursor-pointer select-none rounded-full">
                    <img
                      src={currentUser.avatar}
                      alt="user"
                      className="rounded-full select-none"
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-52">
                  <DropdownMenuLabel>Show Profile</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem>
                    <FaRegUser /> {currentUser.username}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MdOutlineAlternateEmail /> {currentUser.email}
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem disabled>API</DropdownMenuItem> */}
                  <Link to="/dashboard?tab=profile">
                    <DropdownMenuItem className="cursor-pointer">
                      <CgProfile /> Profile
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleSignOut}
                  >
                    <IoMdLogOut /> Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/sign-in">
                <Button className="ml-2 border-2 border-gray-400 bg-transparent hover:bg-transparent cursor-pointer text-gray-800 dark:text-gray-200 ">
                  Sign In
                </Button>
              </Link>
            )}

            <Button
              // className=" bg-gray-200 hover:bg-gray-300"
              className="sm:hidden border-2 border-gray-400 bg-transparent hover:bg-transparent cursor-pointer text-gray-800 dark:text-gray-200"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <BsMenuButtonWideFill />
            </Button>
          </div>
        </div>
      </div>
      {menuOpen ? (
        <div className="sm:hidden flex flex-col mx-4 py-2 border-b-2">
          {link.map((nav) => {
            return (
              <Link
                key={nav.name}
                to={nav.path}
                className={` px-2 py-1 rounded-md block ${
                  nav.path === path ? "text-white bg-cyan-600" : ""
                }`}
              >
                {nav.name}
              </Link>
            );
          })}
        </div>
      ) : null}
    </>
  );
}
