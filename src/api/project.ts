import { CreateListValues, TaskListWithDetailsSchema } from "@/schemas/task-list"
import api from "."
import {
  CreateProjectValues,
  ProjectResponseSchema,
  ProjectWithDetails,
  ProjectWithDetailsSchema
} from "@/schemas/project"

const transformTaskData = (task: any) => ({
  ...task,
  projectId: task.project_id,
  listId: task.list_id,
  createdDate: task.created_date
})

const transformListData = (list: any) => ({
  ...list,
  projectId: list.project_id,
  createdDate: list.created_date,
  tasks: list.tasks?.map(transformTaskData)
})

const transformMemberData = (member: any) => ({
  ...member,
  projectId: member.project_id,
  workspaceMemberId: member.workspace_member_id,
  accessLevel: member.access_level,
  createdDate: member.created_date
})

const transformProjectData = (project: any) => ({
  ...project,
  workspaceId: project.workspace_id,
  startDate: project.start_date,
  endDate: project.end_date,
  createdDate: project.created_date,
  lists: project.lists?.map(transformListData) || [],
  members: project.members?.map(transformMemberData) || []
})

const getWorkspaceProjects = async (workspaceId: string): Promise<ProjectWithDetails[]> => {
  const response = await api.get(`/workspaces/${workspaceId}/projects`)

  const transformData = response.data.map(transformProjectData)

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

  const transformData = transformProjectData(response.data)

  const validatedData = ProjectWithDetailsSchema.safeParse(transformData)

  if (!validatedData.success) {
    throw validatedData.error
  }

  return validatedData.data
}

const getProjectDetails = async (projectId: string): Promise<ProjectWithDetails> => {
  const response = await api.get(`/project/${projectId}`)

  const transformData = transformProjectData(response.data)

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

const ProjectService = {
  getWorkspaceProjects,
  createProject,
  getProjectDetails,
  createList
}

export default ProjectService
