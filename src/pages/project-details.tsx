import { Link, useParams } from "react-router"
import { AlertCircle, Columns3 } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

import Header from "@/components/header"
import { KanbanBoard } from "@/components/kanban-board"
import { CardContainer } from "@/components/ui/card-container"
import EmptyState from "@/components/empty-state"
import CreateListDialog from "@/components/dialogs/create-list-dialog"
import KanbanBoardSkeleton from "@/components/kanban-board-skeleton"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import ProjectDetailsDrawer from "@/components/Project-details-drawer"

import { getProjectDetails } from "@/feature/project-management"

export default function ProjectDetailsPage() {
  const params = useParams()
  const projectId = params.projectId as string
  const { isPending, project, error } = getProjectDetails(projectId)

  if (error) {
    console.error(error)
  }

  const breadcrumb = () => {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/projects" className="hover:text-foreground">
                Projects
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{project?.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
  }

  return (
    <>
      <Header
        breadcrumb={breadcrumb()}
        actions={project ? <ProjectDetailsDrawer project={project} /> : null}
      />
      <motion.main
        className="p-5 flex-1 h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-full h-full flex flex-col">
          <AnimatePresence mode="wait">
            {isPending ? (
              <motion.div
                key="skeleton"
                className="flex-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <KanbanBoardSkeleton />
              </motion.div>
            ) : !project ? (
              <motion.div
                key="not-found"
                className="flex-1 flex justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CardContainer>
                  <EmptyState
                    title="Project not found"
                    description="The project you're looking for doesn't exist or you don't have access to it."
                    icon={<AlertCircle />}
                  />
                </CardContainer>
              </motion.div>
            ) : project.lists.length === 0 ? (
              <motion.div
                key="empty"
                className="flex-1 flex justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CardContainer>
                  <EmptyState
                    title="No list found"
                    description="Create your first list to organize your tasks."
                    icon={<Columns3 />}
                    button={<CreateListDialog projectId={projectId} />}
                  />
                </CardContainer>
              </motion.div>
            ) : (
              <motion.div
                key="board"
                className="flex-1 flex flex-col gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <KanbanBoard lists={project.lists} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.main>
    </>
  )
}
