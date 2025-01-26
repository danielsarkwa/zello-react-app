import { useState } from "react"
import { Link, useParams } from "react-router"
import {
  Calendar,
  CheckCircle2,
  Clock,
  Columns3,
  Flag,
  Loader2,
  MessageSquare,
  Plus
} from "lucide-react"

import Header from "@/components/header"
import CreateTaskDialog from "@/components/dialogs/create-task-dialog"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbList,
  BreadcrumbLink,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"

import { getTaskDetails } from "@/feature/task-management"
import { CardContainer } from "@/components/ui/card-container"
import EmptyState from "@/components/empty-state"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { TASK_STATUS_OPTIONS } from "@/types/task-status"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

export default function TaskDetailsPage() {
  const params = useParams()
  const taskId = params.taskId as string
  const [newComment, setNewComment] = useState("")
  const { isPending, task, error } = getTaskDetails(taskId)

  if (error) {
    console.log(error)
  }

  const breadcrumb = () => {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/projects" className="hover:text-foreground">
                Projects
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/projects/${params.projectId}`} className="hover:text-foreground">
                {params.projectId}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Task Details</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
  }

  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!task) {
    return (
      <div className="flex h-screen items-center justify-center">
        <CardContainer>
          <EmptyState
            icon={<Columns3 />}
            title="Task not found"
            description="The task you are looking for does not exist."
          />
        </CardContainer>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col">
      <Header breadcrumb={breadcrumb()} />

      <div className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col">
          {/* Task Details Section */}
          <Card className="m-4">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{task?.name}</CardTitle>
                  <CardDescription className="mt-2">{task?.description}</CardDescription>
                </div>
                <Button variant="outline">Edit</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                  <Badge variant="outline">{task?.status}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Flag className="h-4 w-4 text-muted-foreground" />
                  <Badge variant="outline">
                    {TASK_STATUS_OPTIONS.find((option) => option.value === task?.status)?.label ||
                      "Status not set"}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {task?.deadline
                      ? format(new Date(task.deadline), "MMM dd, yyyy")
                      : "No deadline"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Created {format(new Date(task.createdDate), "MMM dd, yyyy")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <div className="flex-1 overflow-hidden px-4 pb-20">
            <div className="h-full overflow-y-auto space-y-4">
              {task?.comments?.map((comment) => (
                <Card key={comment.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback>AB</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">[username]</span>
                      <span className="text-sm text-muted-foreground">
                        {format(new Date(comment.createdDate), "MMM dd, yyyy")}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{comment.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Comment Input */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1"
              />
              <Button>
                <MessageSquare className="h-4 w-4 mr-2" />
                Comment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
