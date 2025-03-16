import DashProfile from "@/components/DashProfile";
import DashSidebar from "@/components/DashSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

function Dashboard() {
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
          <DashSidebar searchParam={tab} />
        </div>
        {/* Profile */}
        <div className="flex-1 relative">
          <div className="absolute -top-10 left-28 sm:left-36 md:hidden">
            <SidebarTrigger />
          </div>
          {tab === "profile" && <DashProfile />}
        </div>
      </div>
    </SidebarProvider>
  );
}

export default Dashboard;
