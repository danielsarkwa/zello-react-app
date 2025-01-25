import { Link } from "lucide-react"

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

  if (isPending) {
    return <ProjectListSkeleton />
  }

  if (error) {
    console.error(error)
  }

  const headerActions =
    projects.length > 0 ? (
      <>
        <Button variant="outline">
          <Link /> Share project
        </Button>
        <CreateProjectDialog />
      </>
    ) : null

  return (
    <>
      <Header actions={headerActions} />
      <main className="p-5 flex-1">
        <div className="w-full h-full flex flex-col">
          {projects.length === 0 ? (
            <div className="flex-1 flex justify-center items-center">
              <CardContainer>
                <EmptyState
                  title="No projects found"
                  description="Create your first project."
                  button={<CreateProjectDialog />}
                />
              </CardContainer>
            </div>
          ) : (
            <div className="flex-1 flex flex-col gap-4">
              <ProjectList projects={projects} />
            </div>
          )}
        </div>
      </main>
    </>
  )
}
