import { CardContainer } from "@/components/ui/card-container"

import EmptyState from "@/components/empty-state"
import WorkspaceListItem from "@/components/workspace-list-item"
import WorkspaceListSkeleton from "@/components/workspace-skeleton"

import { getAllWorkspaces } from "@/feature/workspace-management"

export default function WorkspaceListPage() {
  const { isPending, workspaces = [], error } = getAllWorkspaces()

  if (isPending) {
    return <WorkspaceListSkeleton />
  }

  if (error) {
    console.error(error)
  }

  return (
    <CardContainer>
      {workspaces.length === 0 ? (
        <EmptyState
          title="You have no workspaces yet"
          description="Create a new workspace to continue."
        />
      ) : (
        workspaces.map((workspace) => (
          <WorkspaceListItem key={workspace.id} workspace={workspace} />
        ))
      )}
    </CardContainer>
  )
}
