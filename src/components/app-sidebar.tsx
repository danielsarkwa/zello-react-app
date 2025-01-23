import * as React from "react"
import { useLocation } from "react-router"

import { Gauge, LayoutList, Users, FolderKanban } from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar"
import { WorkspaceSwitcher } from "@/components/workspace-switch"

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation()

  const navMain = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Gauge
    },
    {
      title: "Task Board",
      url: "/task-board",
      icon: LayoutList
    },
    {
      title: "Projects",
      url: "/projects",
      icon: FolderKanban
    },
    {
      title: "Members",
      url: "/members",
      icon: Users
    }
  ]

  const mainNavItems = navMain.map((item) => ({
    ...item,
    isActive: location.pathname === item.url
  }))

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <WorkspaceSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={mainNavItems} /> {/* encapsulate nav logic to component */}
        <NavProjects />
        {/* add primary botton */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
