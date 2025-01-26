import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import TaskService from "@/api/task"
import { useErrorHandler } from "@/hooks/use-error-handler"
import { CreateTaskValues, TaskWithDetails } from "@/schemas/tasks"
import { StandardError } from "@/types/standard-error"
import { projectQueryKey } from "@/feature/project-management"

const QUERY_KEY = "tasks"
export function taskQueryKey(id?: string) {
  if (id) {
    return [QUERY_KEY, id]
  }

  return [QUERY_KEY]
}

export function createTask(listId: string, projectId: string) {
  const queryClient = useQueryClient()
  const handleError = useErrorHandler()

  return useMutation({
    mutationFn: (data: CreateTaskValues) => TaskService.createTask(listId, projectId, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: projectQueryKey(response.projectId) })
    },
    onError: (error: StandardError) => {
      handleError(error)
    }
  })
}

export function getTaskDetails(taskId: string) {
  const { isPending, data, error } = useQuery<TaskWithDetails, StandardError>({
    queryKey: taskQueryKey(taskId),
    queryFn: () => TaskService.getTaskDetails(taskId),
    enabled: !!taskId
  })

  return {
    isPending,
    task: data ?? null,
    error
  }
}
