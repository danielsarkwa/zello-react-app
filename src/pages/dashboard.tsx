import CreateProjectDialog from "@/components/dialogs/create-project-dialog"
import Header from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getWorkspaceProjects } from "@/feature/project-management"
import { useWorkspaceStore } from "@/store/workspace"
import { Loader2, FolderClosed, CheckSquare, PauseCircle, FolderKanban } from "lucide-react"

export default function DashboardPage() {
  const { currentWorkspace } = useWorkspaceStore()
  const { projects, isPending } = getWorkspaceProjects(currentWorkspace?.id ?? "")

  return (
    <>
      <Header actions={<CreateProjectDialog />} />
      <main className="p-5 space-y-6 flex-1">
        {isPending ? (
          <div className="flex items-center justify-center h-48">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                  <FolderKanban className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{projects.length}</div>
                  <p className="text-xs text-muted-foreground">Active projects in workspace</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
                  <CheckSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {projects.reduce(
                      (acc, project) =>
                        acc +
                        project.lists?.reduce(
                          (listAcc, list) => listAcc + (list.tasks?.length || 0),
                          0
                        ),
                      0
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">Tasks across all projects</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Not Started</CardTitle>
                  <PauseCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {projects.filter((project) => project.status === 0).length}
                  </div>
                  <p className="text-xs text-muted-foreground">Projects pending initiation</p>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </main>
    </>
  )
}
