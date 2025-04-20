import DashComments from "@/components/DashComments";
import DashPosts from "@/components/DashPosts";
import DashProfile from "@/components/DashProfile";
import DashSidebar from "@/components/DashSidebar";
import DashUsers from "@/components/DashUsers";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

function Dashboard() {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const [tab, setTab] = useState();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFormUrl = urlParams.get("tab");
    setTab(tabFormUrl);
  }, [location.search]);
  return (
    <SidebarProvider>
      <div className="flex flex-row w-full">
        <div className="w-50 hidden md:block">
          <DashSidebar searchParam={tab} user={currentUser} />
        </div>
        {/* Profile */}
        <div className="flex-1 relative">
          <div className="absolute -top-10 left-28 sm:left-36 md:hidden">
            <SidebarTrigger />
          </div>
          {tab === "profile" && <DashProfile />}
          {tab === "posts" && <DashPosts />}
          {tab === "comments" && <DashComments />}
          {tab === "users" && <DashUsers />}
        </div>
      </div>
    </SidebarProvider>
  );
}

export default Dashboard;
