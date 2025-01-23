import api from "."
import {
  CreateWorkspaceValues,
  WorkspaceResponseSchema,
  WorkspaceWithDetails,
  WorkspaceWithDetailsSchema
} from "@/schemas/workspace"

const getWorkspaces = async (): Promise<WorkspaceWithDetails[]> => {
  const response = await api.get("/workspaces")

  const transformData = response.data.map((workspace: any) => {
    return {
      ...workspace,
      ownerId: workspace.owner_id,
      createdDate: workspace.created_date,
      members: workspace.members
        ? workspace.members.map((member: any) => ({
            ...member,
            workspaceId: member.workspace_id,
            userId: member.user_id,
            accessLevel: member.access_level,
            createdDate: member.created_date
          }))
        : [],
      projects: workspace.projects
        ? workspace.projects.map((project: any) => ({
            ...project,
            workspaceId: project.workspace_id,
            startDate: project.start_date,
            endDate: project.end_date,
            createdDate: project.created_date
          }))
        : []
    }
  })

  const validatedData = WorkspaceResponseSchema.safeParse(transformData)

  if (!validatedData.success) {
    console.log(validatedData.error)
    throw validatedData.error
  }

  return validatedData.data
}

const createWorkspace = async (data: CreateWorkspaceValues): Promise<WorkspaceWithDetails> => {
  const response = await api.post("/workspaces", data)

  const transformData = {
    ...response.data,
    ownerId: response.data.owner_id,
    createdDate: response.data.created_date,
    members: response.data.members
      ? response.data.members.map((member: any) => ({
          ...member,
          workspaceId: member.workspace_id,
          userId: member.user_id,
          accessLevel: member.access_level,
          createdDate: member.created_date
        }))
      : [],
    projects: response.data.projects
      ? response.data.projects.map((project: any) => ({
          ...project,
          workspaceId: project.workspace_id,
          startDate: project.start_date,
          endDate: project.end_date,
          createdDate: project.created_date
        }))
      : []
  }

  const validatedData = WorkspaceWithDetailsSchema.safeParse(transformData)

  if (!validatedData.success) {
    throw validatedData.error
  }

  return validatedData.data
}

const WorkspaceService = {
  getWorkspaces,
  createWorkspace
}

export default WorkspaceService
