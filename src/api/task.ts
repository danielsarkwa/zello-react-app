import api from "."
import { CreateTaskValues, TaskWithDetails, TaskWithDetailsSchema } from "@/schemas/tasks"
import { transformTaskData } from "@/lib/transform-data"

const createTask = async (listId: string, projectId: string, data: CreateTaskValues) => {
  const response = await api.post(`/list/${listId}/tasks`, {
    name: data.name,
    description: data.description,
    priority: data.priority ?? null,
    status: data.status ?? null,
    list_id: listId,
    project_id: projectId
  })

  const transformData = transformTaskData(response.data)

  const validatedData = TaskWithDetailsSchema.safeParse(transformData)

  if (!validatedData.success) {
    throw validatedData.error
  }

  return validatedData.data
}

const getTaskDetails = async (taskId: string): Promise<TaskWithDetails> => {
  const response = await api.get(`/task/${taskId}`)

  const transformData = transformTaskData(response.data)

  const validatedData = TaskWithDetailsSchema.safeParse(transformData)

  if (!validatedData.success) {
    throw validatedData.error
  }

  return validatedData.data
}

const TaskService = {
  createTask,
  getTaskDetails
}

export default TaskService
