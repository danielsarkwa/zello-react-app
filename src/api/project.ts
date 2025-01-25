import api from "."
import {
  CreateProjectValues,
  ProjectResponseSchema,
  ProjectWithDetails,
  ProjectWithDetailsSchema
} from "@/schemas/project"

const getWorkspaceProjects = async (workspaceId: string): Promise<ProjectWithDetails[]> => {
  const response = await api.get(`/workspaces/${workspaceId}/projects`)

  const transformData = response.data.map((project: any) => ({
    ...project,
    workspaceId: project.workspace_id,
    startDate: project.start_date,
    endDate: project.end_date,
    createdDate: project.created_date,
    lists: project.lists
      ? project.lists?.map((list: any) => ({
          ...list,
          projectId: list.project_id,
          createdDate: list.created_date
        }))
      : [],
    members: project.members
      ? project.members?.map((member: any) => ({
          ...member,
          workspaceId: member.workspace_id,
          userId: member.user_id,
          accessLevel: member.access_level,
          createdDate: member.created_date
        }))
      : []
  }))

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

  const transformData = {
    ...response.data,
    workspaceId: response.data.workspace_id,
    startDate: response.data.start_date,
    endDate: response.data.end_date,
    createdDate: response.data.created_date,
    lists: response.data.lists
      ? response.data.lists?.map((list: any) => ({
          ...list,
          projectId: list.project_id,
          createdDate: list.created_date
        }))
      : [],
    members: response.data.members
      ? response.data.members?.map((member: any) => ({
          ...member,
          workspaceId: member.workspace_id || '',
          userId: member.user_id || '',
          accessLevel: member.access_level,
          createdDate: member.created_date
        }))
      : []
  }

  const validatedData = ProjectWithDetailsSchema.safeParse(transformData)

  if (!validatedData.success) {
    throw validatedData.error
  }

  return validatedData.data
}

const ProjectService = {
  getWorkspaceProjects,
  createProject
}

export default ProjectService
