///////////////////////////////////////////////
///~ (bc) this is the sidebar idk why i named it dashboardlayout

import React from 'react';
import { Link, Form } from "@remix-run/react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import {
  Home,
  ChartBar,
  User2,
  LogOut,
  Settings,
  Calendar as CalendarIcon,
  Dumbbell,
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

///////////////////////////////////////////////
///~ sidebar menu items
const navigationItems = [
  { icon: Home, label: "Dashboard", path: "/dashboard" },
  { icon: ChartBar, label: "Statistics", path: "/statistics" },
  { icon: Dumbbell, label: "Workouts", path: "/workouts" },
  { icon: CalendarIcon, label: "Schedule", path: "/schedule" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

///////////////////////////////////////////////
///~ sidebar component
export default function DashboardLayout({
                                          children,
                                          selectedTab,
                                          setSelectedTab
                                        }: DashboardLayoutProps) {
  return (
    <div className="flex h-[calc(100vh-4rem)] mt-16">
      <div className="flex flex-1 overflow-hidden">
        <SidebarProvider>

          {/* sidebar start */}
          <Sidebar className="top-16 h-[calc(100vh-4rem)] fixed">

            {/* dashboard title */}
            <SidebarHeader>
              <div className="flex items-center px-6 py-4 border-b">
                <Dumbbell className="h-6 w-6 text-yellow-500 mr-2" />
                <h2 className="text-xl font-bold bg-gradient-to-r from-red-900 to-yellow-600 bg-clip-text text-transparent">
                  Dashboard
                </h2>
              </div>
            </SidebarHeader>

            <SidebarContent>

              {/* the group where current menu items nested uder*/}
              <SidebarGroup>
                <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                <SidebarGroupContent>

                  {/*  using js to map props as menu items*/}
                  <SidebarMenu>
                    {navigationItems.map((item) => (
                      <SidebarMenuItem key={item.label}>
                        <SidebarMenuButton
                          asChild
                          isActive={selectedTab === item.label}
                        >
                          <Link
                            to={item.path}
                            onClick={() => setSelectedTab(item.label)}
                            className="flex items-center gap-2"
                          >
                            <item.icon className="h-4 w-4" />
                            <span>{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>

                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            {/* bottom menu items, profile/logout */}
            <SidebarFooter>
              <SidebarMenu>

                {/* profile menu item*/}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/profile" className="flex items-center gap-2">
                      <User2 className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* log out menu item*/}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Form method="post" action="/logout">
                      <button
                        type="submit"
                        className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 rounded-md"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Log Out</span>
                      </button>
                    </Form>
                  </SidebarMenuButton>
                </SidebarMenuItem>

              </SidebarMenu>
            </SidebarFooter>

          </Sidebar> {/* sidebar end*/}

          {/*  margins */}
          <main className="flex-1 overflow-auto p-6 ml-0">
            {children}
          </main>

        </SidebarProvider>
      </div>
    </div>
  );
}