import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import WorkspaceService from "@/api/workspace"
import { WorkspaceWithDetails } from "@/schemas/workspace"
import { StandardError } from "@/types/standard-error"
import { useErrorHandler } from "@/hooks/use-error-handler"

const QUERY_KEY = "workspaces"
export function workspaceQueryKey(id?: string) {
  if (id) {
    return [QUERY_KEY, id]
  }

  return [QUERY_KEY]
}

export function getAllWorkspaces() {
  const { isPending, data, error } = useQuery<WorkspaceWithDetails[]>({
    queryKey: workspaceQueryKey(),
    queryFn: () => WorkspaceService.getWorkspaces()
  })

  return {
    isPending,
    workspaces: data ?? [],
    error
  }
}

export function createWorkspace() {
  const queryClient = useQueryClient()
  const handleError = useErrorHandler()

  return useMutation({
    mutationFn: WorkspaceService.createWorkspace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workspaceQueryKey() })
    },
    onError: (error: StandardError) => {
      handleError(error)
    }
  })
}
