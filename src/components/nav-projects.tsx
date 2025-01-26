import { motion } from "framer-motion"
import { Link as LinkIcon, MoreHorizontal, UserPlus, Trash2, Frame } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar"
import { useWorkspaceStore } from "@/store/workspace"
import { getWorkspaceProjects } from "@/feature/project-management"
import { Link, useLocation } from "react-router"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0 }
}

export function NavProjects() {
  const { isMobile } = useSidebar()
  const { currentWorkspace } = useWorkspaceStore()
  const location = useLocation()

  const { isPending, projects = [] } = getWorkspaceProjects(currentWorkspace?.id ?? "")

  if (!projects.length || isPending) {
    return null
  }

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-1">
          {projects.map((project) => {
            const isActive = location.pathname === `/projects/${project.id}`

            return (
              <motion.div key={project.id} variants={item}>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    tooltip={project.name}
                    className={`${
                      isActive &&
                      "bg-gray-300/25 dark:bg-gray-800 hover:bg-gray-300/35 dark:hover:bg-gray-800/85"
                    }`}
                  >
                    <Link to={`/projects/${project.id}`}>
                      <Frame className={`${isActive && "text-primary"}`} />
                      <span className={`${isActive && "text-primary"}`}>{project.name}</span>
                    </Link>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction showOnHover>
                        <MoreHorizontal />
                        <span className="sr-only">More</span>
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-48"
                      side={isMobile ? "bottom" : "right"}
                      align={isMobile ? "end" : "start"}
                    >
                      <DropdownMenuItem>
                        <UserPlus className="text-muted-foreground" />
                        <span>Invite member</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <LinkIcon className="text-muted-foreground" />
                        <span>Copy Link</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Trash2 className="text-muted-foreground" />
                        <span>Delete Project</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              </motion.div>
            )
          })}
        </motion.div>
      </SidebarMenu>
    </SidebarGroup>
  )
}
