import { useMutation, useQueryClient } from "@tanstack/react-query"
import TaskService from "@/api/task"
import { useErrorHandler } from "@/hooks/use-error-handler"
import { CreateTaskValues } from "@/schemas/tasks"
import { StandardError } from "@/types/standard-error"
import { projectQueryKey } from "@/feature/project-management"

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
