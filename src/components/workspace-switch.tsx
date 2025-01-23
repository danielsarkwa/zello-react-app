"use client"

import { useNavigate } from "react-router"
import { ChevronsUpDown, Hash, Plus } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"

import { getAllWorkspaces } from "@/feature/workspace-management"
import { useWorkspaceStore } from "@/store/workspace"
import { Skeleton } from "./ui/skeleton"

export function WorkspaceSwitcher() {
  const { isMobile } = useSidebar()
  const navigate = useNavigate()
  const { currentWorkspace, setCurrentWorkspace } = useWorkspaceStore()
  const { isPending, workspaces } = getAllWorkspaces()

  if (isPending) {
    return (
      <SidebarMenu className="cursor-not-allowed">
        <SidebarMenuItem>
          <div className="flex items-center justify-between w-full">
            <div className="absolute inset-0 flex items-center justify-center px-2 opacity-60">
              <Hash className="size-4" />
              <ChevronsUpDown className="ml-auto size-4" />
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Hash className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {currentWorkspace?.name || "Select Workspace"}
                </span>
                {/* <span className="truncate text-xs">Workspace</span> */}
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Workspaces
              <Badge variant="outline" className="mx-2">
                {workspaces.length}
              </Badge>
            </DropdownMenuLabel>
            {workspaces.map((workspace) => (
              <DropdownMenuItem
                key={workspace.id}
                onClick={() => setCurrentWorkspace(workspace)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <Hash className="size-4 shrink-0" />
                </div>
                {workspace.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2" onClick={() => navigate("/create-workspace")}>
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Add workspace</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
