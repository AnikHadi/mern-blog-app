import { Logs, Moon, Search } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const path = useLocation().pathname;
  const link = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/project" },
    // { name: "Contact", path: "/contact" },
    // { name: "Dashboard", path: "/dashboard" },
  ];
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
        <form>
          <div className="relative  items-center hidden lg:flex">
            <Input type="text" placeholder="Search..." />
            <Search
              size={16}
              color="#808080"
              strokeWidth={1}
              absoluteStrokeWidth
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
                  nav.path === path ? "text-white bg-cyan-600" : ""
                }`}
              >
                {nav.name}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center">
          <Button className="bg-gray-300 lg:hidden rounded-full">
            <Search
              size={18}
              color="#808080"
              strokeWidth={1}
              absoluteStrokeWidth
              className="opacity-50 hover:opacity-70 cursor-pointer"
            />
          </Button>
          <div className="flex gap-2 md:order-2">
            <Button className="bg-gray-300 hidden sm:inline hover:bg-gray-400 rounded-full">
              <Moon
                size={20}
                color="#808080"
                strokeWidth={1}
                absoluteStrokeWidth
              />
            </Button>
            <Link to="/sign-in">
              <Button className="ml-2">Sign In</Button>
            </Link>
            <Button
              className="sm:hidden bg-gray-200 hover:bg-gray-300"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <Logs color="#808080" absoluteStrokeWidth />
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
