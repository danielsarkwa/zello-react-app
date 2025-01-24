import CreateProjectDialog from "@/components/create-project-dialog"
import EmptyState from "@/components/empty-state"
import ProjectList from "@/components/project-list"
import ProjectListSkeleton from "@/components/projectListSkeleton"
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

  return (
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
        <ProjectList projects={projects} />
      )}
    </div>
  )
}
