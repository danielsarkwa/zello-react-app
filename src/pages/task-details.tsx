import { useState } from "react"
import { Link, useParams } from "react-router"
import { Calendar, CheckCircle2, Clock, Columns3, Goal, Loader2, MessageSquare } from "lucide-react"

import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbList,
  BreadcrumbLink,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { CardContainer } from "@/components/ui/card-container"
import EmptyState from "@/components/empty-state"

import { format } from "date-fns"
import { TASK_STATUS_OPTIONS } from "@/types/task-status"
import { PRIORITY_OPTIONS } from "@/types/priority-enum"
import { getTaskDetails } from "@/feature/task-management"
import { useToast } from "@/hooks/use-toast"

export default function TaskDetailsPage() {
  const { toast } = useToast()
  const params = useParams()
  const taskId = params.taskId as string
  const [newComment, setNewComment] = useState("")
  const { isPending, task, error } = getTaskDetails(taskId)

  const breadcrumb = () => (
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
              {task?.project?.name || params.projectId}
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

  if (isPending) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    console.error(error)
  }

  if (!task) {
    return (
      <div className="h-screen flex items-center justify-center">
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

  const handleClickPlaceholder = () => {
    toast({
      title: "🫣 Ooops! Feature not implemented",
      description: "This is just a demo, and it's not functioning yet.",
      duration: 1500
    })
  }

  return (
    <div className="h-screen flex flex-col">
      <Header breadcrumb={breadcrumb()} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Task Details - Fixed at top */}
        <Card className="m-4">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{task.name}</CardTitle>
                <CardDescription className="mt-2">{task.description}</CardDescription>
              </div>
              <Button variant="outline" onClick={handleClickPlaceholder}>
                Edit
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 font-normal">
                <Badge
                  variant="outline"
                  className="flex items-center font-normal gap-1.5 px-2.5 py-1.5"
                >
                  <CheckCircle2 size={18} />
                  {PRIORITY_OPTIONS.find((option) => option.value === task.priority)?.label ||
                    "Priority not set"}
                </Badge>
              </div>
              <div className="flex items-center gap-2 font-normal">
                <Badge
                  variant="outline"
                  className="flex items-center font-normal gap-1.5 px-2.5 py-1.5"
                >
                  <Goal size={18} />
                  {TASK_STATUS_OPTIONS.find((option) => option.value === task.status)?.label ||
                    "Status not set"}
                </Badge>
              </div>
              <div className="flex items-center gap-2 font-normal">
                <Badge
                  variant="outline"
                  className="flex items-center font-normal gap-1.5 px-2.5 py-1.5"
                >
                  <Calendar size={18} />
                  {task.deadline ? format(new Date(task.deadline), "MMM dd, yyyy") : "No deadline"}
                </Badge>
              </div>
              <div className="flex items-center gap-2 font-normal">
                <Badge
                  variant="outline"
                  className="flex items-center font-normal gap-1.5 px-2.5 py-1.5"
                >
                  <Clock size={18} />
                  Created {format(new Date(task.createdDate), "MMM dd, yyyy")}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scrollable Comments Area */}
        <div className="flex-1 overflow-y-auto px-4 pb-24">
          {task.comments?.length === 0 ? (
            <div className="h-full flex-1 flex items-center justify-center">
              <CardContainer>
                <EmptyState
                  icon={<MessageSquare />}
                  title="No comments yet"
                  description="Be the first to start the conversation!"
                />
              </CardContainer>
            </div>
          ) : (
            <div className="space-y-4">
              {task.comments?.map((comment) => (
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
          )}
        </div>

        {/* Fixed Comment Input */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t">
          <div className="flex gap-2">
            <Input
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleClickPlaceholder}>
              <MessageSquare />
              Comment
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
