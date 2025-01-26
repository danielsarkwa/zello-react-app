import { Link } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import CreateProjectDialog from "@/components/create-project-dialog"
import EmptyState from "@/components/empty-state"
import ProjectList from "@/components/project-list"
import ProjectListSkeleton from "@/components/projectListSkeleton"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import { CardContainer } from "@/components/ui/card-container"
import { getWorkspaceProjects } from "@/feature/project-management"
import { useWorkspaceStore } from "@/store/workspace"

export default function ProjectsPage() {
  const { currentWorkspace } = useWorkspaceStore()
  const { isPending, projects = [], error } = getWorkspaceProjects(currentWorkspace?.id ?? "")

  if (error) {
    console.error(error)
  }

  const headerActions =
    projects.length > 0 ? (
      <motion.div
        className="flex gap-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button variant="outline">
          <Link /> Share project
        </Button>
        <CreateProjectDialog />
      </motion.div>
    ) : null

  return (
    <>
      <Header actions={headerActions} />
      <motion.main
        className="p-5 flex-1"
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
                <ProjectListSkeleton />
              </motion.div>
            ) : projects.length === 0 ? (
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
                    title="No projects found"
                    description="Create your first project."
                    button={<CreateProjectDialog />}
                  />
                </CardContainer>
              </motion.div>
            ) : (
              <motion.div
                key="projects"
                className="flex-1 flex flex-col gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectList projects={projects} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.main>
    </>
  )
}
