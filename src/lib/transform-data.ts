import { priorityToEnum } from "@/types/priority-enum"
import { statusToEnum } from "@/types/task-status"

const transformAssigneeData = (assignee: any) => ({
  ...assignee,
  userId: assignee.user_id,
  assignedDate: assignee.assigned_date
})

const transformCommentData = (comment: any) => ({
  ...comment,
  userId: comment.user_id,
  createdDate: comment.created_date
})

export const transformTaskData = (task: any) => ({
  ...task,
  projectId: task.project_id,
  listId: task.list_id,
  createdDate: task.created_date,
  priority: task.priority ? priorityToEnum[task.priority] : null,
  status: task.status ? statusToEnum[task.status] : null,
  assignees: task.assignees.map(transformAssigneeData) || [],
  comments: task.comments?.map(transformCommentData) || [],
  project: task.project && transformProjectDetails(task.project)
})

export const transformListData = (list: any) => ({
  ...list,
  projectId: list.project_id,
  createdDate: list.created_date,
  tasks: list.tasks?.map(transformTaskData) || []
})

const transformMemberData = (member: any) => ({
  ...member,
  projectId: member.project_id,
  workspaceMemberId: member.workspace_member_id,
  accessLevel: member.access_level,
  createdDate: member.created_date
})

export const transformProjectDetails = (project: any) => ({
  ...project,
  workspaceId: project.workspace_id,
  startDate: project.start_date,
  endDate: project.end_date,
  createdDate: project.created_date,
  lists: project.lists?.map(transformListData) || [],
  members: project.members?.map(transformMemberData) || []
})
