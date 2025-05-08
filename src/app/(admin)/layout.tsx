"use client";

import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isUserLoggedIn, isUserLoggedInViaRefresh } from "@/utils/auth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      //check for an active session
      let status = await isUserLoggedIn();
      console.log("status of isuserlogged in??? " + status);
      if (!status) {
        // If no active session, refresh the session using the refresh token
        status = await isUserLoggedInViaRefresh();
        console.log("status of isUserLoggedInViaRefresh:", status);
      }
  
      if (!status) {
        router.push("/signin");
      } else {
        setIsLoading(false);
      }
    };
    checkLoginStatus();
  }, [router]);

  if (isLoading) return null; // or a loading spinner

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  return (
    <div className="min-h-screen xl:flex">
      {/* Sidebar and Backdrop */}
      <AppSidebar />
      <Backdrop />
      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}
      >
        {/* Header */}
        <AppHeader />
        {/* Page Content */}
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">{children}</div>
      </div>
    </div>
  );
}
