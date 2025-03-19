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
import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router";
import { toast } from "react-toastify";

// const items = [
//   {
//     title: "Projects",
//     icon: FaSuitcase,
//     to: "/projects",
//   },
//   {
//     title: "About",
//     icon: FcAbout,
//     to: "/about",
//   },
// ];
export default function DashSidebar({ searchParam }) {
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
          <SidebarMenuItem>
            <SidebarMenuButton
              className={`cursor-pointer ${
                searchParam === "profile" &&
                "bg-[#4d4d4db0] hover:bg-[#4d4d4db0] text-white hover:text-white "
              }`}
            >
              <Link
                to="/dashboard?tab=profile"
                className="flex items-center justify-between gap-2 text-sm w-full"
              >
                <span className="flex items-center gap-2  ">
                  <CgProfile /> Profile
                </span>
                <span className="text-white bg-gray-600 px-2 py-0.5 text-[10px] rounded-sm">
                  User
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {/* {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className={searchParam === item.to && "bg-[#1d293d]"}
              >
                <Link to={item.to}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))} */}
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
