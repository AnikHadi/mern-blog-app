import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { signOut } from "@/redux/user/userSlice";
import { signOutAction } from "@/utils/action/userAction";
import { BsFileEarmarkPostFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaHome, FaUsers } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { LiaCommentSolid } from "react-icons/lia";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router";
import { toast } from "react-toastify";

const items = [
  {
    title: "Profile",
    icon: CgProfile,
    to: "/dashboard?tab=profile",
  },
  {
    title: "Comments",
    icon: LiaCommentSolid,
    to: "/dashboard?tab=comments",
  },
  {
    title: "Users",
    icon: FaUsers,
    to: "/dashboard?tab=users",
  },
  {
    title: "Posts",
    icon: BsFileEarmarkPostFill,
    to: "/dashboard?tab=posts",
  },
];
export default function DashSidebar({ searchParam, user }) {
  const dispatch = useDispatch();
  const { pathname, search } = useLocation();
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

  const linkItems = user?.isAdmin
    ? items
    : items.filter((item) => item.title === "Profile");

  return (
    <Sidebar className="static  w-50">
      <SidebarHeader className="text-xl font-bold px-6 pt-2">
        Profile
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="px-6">
          <SidebarMenuItem>
            <SidebarMenuButton
              className={`cursor-pointer ${
                pathname === "/dashboard" &&
                search === "" &&
                "bg-[#4d4d4db0] hover:bg-[#4d4d4db0] text-white hover:text-white "
              }`}
            >
              <Link
                to="/dashboard"
                className="flex items-center gap-2 text-sm w-full  "
              >
                <FaHome /> Dashboard
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {linkItems.map((item) => {
            const Icon = item.icon;
            const isActive = searchParam === item.title.toLowerCase();
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  className={`cursor-pointer ${
                    isActive &&
                    "bg-[#4d4d4db0] hover:bg-[#4d4d4db0] text-white hover:text-white "
                  }`}
                >
                  <Link
                    to={item.to}
                    className="flex items-center justify-between gap-2 text-sm w-full"
                  >
                    <span className="flex items-center gap-2  ">
                      <Icon /> {item.title}
                    </span>
                    {item.title === "Profile" && (
                      <span className="text-white bg-gray-600 px-2 py-0.5 text-[10px] rounded-sm">
                        {user?.isAdmin ? "Admin" : "User"}
                      </span>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
          <SidebarMenuItem>
            <SidebarMenuButton
              className={`cursor-pointer`}
              onClick={handleSignOut}
            >
              <IoMdLogOut />
              Sing Out
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
