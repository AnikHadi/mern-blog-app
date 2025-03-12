import { Separator } from "@radix-ui/react-separator";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="px-4 border border-t-8 border-teal-500">
      <div className=" w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between mt-4 sm:flex md:grid-cols-1">
          <div className="">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Hadi's
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div className="my-3 ">
              <h2 className="mb-3 uppercase font-bold">About</h2>
              <div className="flex flex-col gap-2">
                <Link
                  to="/"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Contact
                </Link>
              </div>
            </div>
            <div className="my-3 ">
              <h2 className="mb-3 uppercase font-bold">Follow Us</h2>
              <div className="flex flex-col gap-2">
                <Link
                  to="/"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Contact
                </Link>
              </div>
            </div>
            <div className="my-3 ">
              <h2 className="mb-3 uppercase font-bold">Legal</h2>
              <div className="flex flex-col gap-2">
                <Link
                  to="/"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/about"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Terms & Conditions
                </Link>
                <Link
                  to="/contact"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex justify-between flex-col gap-4 sm:flex-row">
          <p className=" text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Hadi's Blog. All rights reserved.
          </p>
          <div className="flex gap-4 md:gap-6">
            <Link to="/" className=" text-gray-500 hover:text-gray-700">
              <FaFacebook color="#1877F2" className="text-2xl" />
            </Link>
            <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
              <FaTwitter color="#1DA1F2" className="text-2xl" />
            </Link>
            <Link to="/" className=" text-gray-500 hover:text-gray-700">
              <FaGithub className="text-2xl text-gray-950 dark:text-gray-100" />
            </Link>
            <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
              <FaInstagram color="#5B51D8" className="text-2xl " />
            </Link>
            <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
              <FaLinkedin color="#0077B5" className="text-2xl" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
