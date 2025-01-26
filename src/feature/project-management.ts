import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import ProjectService from "@/api/project"
import { CreateProjectValues, ProjectWithDetails } from "@/schemas/project"
import { StandardError } from "@/types/standard-error"
import { useErrorHandler } from "@/hooks/use-error-handler"
import { CreateListValues } from "@/schemas/task-list"

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

export function getProjectDetails(projectId: string) {
  const { isPending, data, error } = useQuery<ProjectWithDetails, StandardError>({
    queryKey: projectQueryKey(projectId),
    queryFn: () => ProjectService.getProjectDetails(projectId),
    enabled: !!projectId
  })

  return {
    isPending,
    project: data ?? null,
    error
  }
}

export function deleteProject(projectId: string) {
  const queryClient = useQueryClient()
  const handleError = useErrorHandler()

  return useMutation({
    mutationFn: ProjectService.deleteProject,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: projectQueryKey(projectId) })
    },
    onError: (error: StandardError) => {
      handleError(error)
    }
  })
}

export function createList(projectId: string) {
  const queryClient = useQueryClient()
  const handleError = useErrorHandler()

  return useMutation({
    mutationFn: (data: CreateListValues) => ProjectService.createList(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectQueryKey(projectId) })
    },
    onError: (error: StandardError) => {
      handleError(error)
    }
  })
}
