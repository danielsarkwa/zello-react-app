import api from "."
import {
  CreateWorkspaceValues,
  WorkspaceResponseSchema,
  WorkspaceWithDetails,
  WorkspaceWithDetailsSchema
} from "@/schemas/workspace"

const transformWorkspaceMemberData = (member: any) => ({
  ...member,
  workspaceId: member.workspace_id,
  userId: member.user_id,
  accessLevel: member.access_level,
  createdDate: member.created_date
})

const transformWorkspaceProjectData = (project: any) => ({
  ...project,
  workspaceId: project.workspace_id,
  startDate: project.start_date,
  endDate: project.end_date,
  createdDate: project.created_date
})

const transformWorkspaceData = (workspace: any) => ({
  ...workspace,
  ownerId: workspace.owner_id,
  createdDate: workspace.created_date,
  members: workspace.members?.map(transformWorkspaceMemberData),
  projects: workspace.projects?.map(transformWorkspaceProjectData)
})

const getWorkspaces = async (): Promise<WorkspaceWithDetails[]> => {
  const response = await api.get("/workspaces")

  const transformedData = response.data.map(transformWorkspaceData)

  const validatedData = WorkspaceResponseSchema.safeParse(transformedData)

  if (!validatedData.success) {
    console.log(validatedData.error)
    throw validatedData.error
  }

  return validatedData.data
}

const createWorkspace = async (data: CreateWorkspaceValues): Promise<WorkspaceWithDetails> => {
  const response = await api.post("/workspaces", data)

  const transformedData = transformWorkspaceData(response.data)

  const validatedData = WorkspaceWithDetailsSchema.safeParse(transformedData)

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
