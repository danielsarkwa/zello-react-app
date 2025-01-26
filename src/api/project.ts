import { CreateListValues, TaskListWithDetailsSchema } from "@/schemas/task-list"
import api from "."
import {
  CreateProjectValues,
  ProjectResponseSchema,
  ProjectWithDetails,
  ProjectWithDetailsSchema
} from "@/schemas/project"
import { transformListData, transformProjectDetails } from "@/lib/transform-data"

const getWorkspaceProjects = async (workspaceId: string): Promise<ProjectWithDetails[]> => {
  const response = await api.get(`/workspaces/${workspaceId}/projects`)

  const transformData = response.data.map(transformProjectDetails)

  const validatedData = ProjectResponseSchema.safeParse(transformData)

  if (!validatedData.success) {
    throw validatedData.error
  }

  return validatedData.data
}

const createProject = async (data: CreateProjectValues): Promise<ProjectWithDetails> => {
  const response = await api.post("/project", {
    ...data,
    workspace_id: data.workspaceId
  })

  const transformData = transformProjectDetails(response.data)

  const validatedData = ProjectWithDetailsSchema.safeParse(transformData)

  if (!validatedData.success) {
    throw validatedData.error
  }

  return validatedData.data
}

const getProjectDetails = async (projectId: string): Promise<ProjectWithDetails> => {
  const response = await api.get(`/project/${projectId}`)

  const transformData = transformProjectDetails(response.data)

  const validatedData = ProjectWithDetailsSchema.safeParse(transformData)

  if (!validatedData.success) {
    throw validatedData.error
  }

  return validatedData.data
}

const createList = async (projectId: string, data: CreateListValues) => {
  const response = await api.post(`/project/${projectId}/lists`, {
    project_id: projectId,
    name: data.name
  })

  const transformData = transformListData(response.data)

  const validatedData = TaskListWithDetailsSchema.safeParse(transformData)

  if (!validatedData.success) {
    throw validatedData.error
  }

  return validatedData.data
}

const deleteProject = async (projectId: string): Promise<void> => {
  await api.delete(`/project/${projectId}`)
}

const ProjectService = {
  getWorkspaceProjects,
  createProject,
  getProjectDetails,
  createList,
  deleteProject
}

export default ProjectService
