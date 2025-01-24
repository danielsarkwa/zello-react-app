import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import ProjectService from "@/api/project"
import { CreateProjectValues, ProjectWithDetails } from "@/schemas/project"
import { StandardError } from "@/types/standard-error"
import { useErrorHandler } from "@/hooks/use-error-handler"

const QUERY_KEY = "projects"
export function projectQueryKey(id?: string) {
  if (id) {
    return [QUERY_KEY, id]
  }

  return [QUERY_KEY]
}

export function getWorkspaceProjects(workspaceId: string) {
  const { isPending, data, error } = useQuery<ProjectWithDetails[]>({
    queryKey: projectQueryKey(workspaceId),
    queryFn: () => ProjectService.getWorkspaceProjects(workspaceId)
  })

  return {
    isPending,
    projects: data ?? [],
    error
  }
}

export function createProject() {
  const queryClient = useQueryClient()
  const handleError = useErrorHandler()

  return useMutation({
    mutationFn: (data: CreateProjectValues) => ProjectService.createProject(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: projectQueryKey(response.workspaceId) })
    },
    onError: (error: StandardError) => {
      handleError(error)
    }
  })
}
