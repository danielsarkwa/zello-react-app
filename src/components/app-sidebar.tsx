import * as React from "react"
import { Command, Frame, Gauge, LayoutList, Users } from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg"
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Gauge,
      isActive: true
    },
    {
      title: "Task Board",
      url: "/task-board",
      icon: LayoutList
    },
    {
      title: "Members",
      url: "/members",
      icon: Users
    }
  ],
  projects: [
    {
      // add project id
      name: "Design Engineering",
      url: "/projects/123e4567-e89b-12d3-a456-426614174000",
      icon: Frame
    },
    {
      // add project id
      name: "Sales & Marketing",
      url: "/projects/987fcdeb-51a2-43d8-b789-012345678901",
      icon: Frame
    },
    {
      // add project id
      name: "Travel",
      url: "/projects/550e8400-e29b-41d4-a716-446655440000",
      icon: Frame
    }
  ]
}

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        {/* add primary botton */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
