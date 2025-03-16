import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Home } from "lucide-react";
import { FaSuitcase } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { Link } from "react-router";

const items = [
  {
    title: "Dashboard",
    icon: Home,
    to: "/dashboard",
  },
  {
    title: "Projects",
    icon: FaSuitcase,
    to: "/projects",
  },
  {
    title: "Profile",
    icon: Home,
    to: "/dashboard?tab=profile",
  },
  {
    title: "About",
    icon: FcAbout,
    to: "/about",
  },
];
export default function DashSidebar({ searchParam }) {
  return (
    <Sidebar className="static  w-50">
      <SidebarHeader className="text-xl font-bold px-6 pt-2">
        Profile
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="px-6">
          {items.map((item) => (
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
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
