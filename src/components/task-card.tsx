import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cva } from "class-variance-authority"
import { Calendar, Flag, GripVertical } from "lucide-react"
import { Badge } from "./ui/badge"
import { format } from "date-fns"

import { Task } from "@/schemas/tasks"
import { TASK_STATUS_OPTIONS, TaskStatusEnum } from "@/types/task-status"
import { PRIORITY_OPTIONS } from "@/types/priority-enum"

interface TaskCardProps {
  task: Task
  isOverlay?: boolean
}

export type TaskType = "Task"

export interface TaskDragData {
  type: TaskType
  task: Task
}

export function TaskCard({ task, isOverlay }: TaskCardProps) {
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task
    } satisfies TaskDragData,
    attributes: {
      roleDescription: "Task"
    }
  })

  const style = {
    transition,
    transform: CSS.Translate.toString(transform)
  }

  const variants = cva("", {
    variants: {
      dragging: {
        over: "ring-2 opacity-30",
        overlay: "ring-2 ring-primary"
      }
    }
  })

  const formatDate = (date: string) => {
    return format(new Date(date), "d MMM")
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined
      })}
    >
      <CardHeader className="px-3 py-3 space-between flex flex-row border-b-[1px] border-secondary relative">
        <Button
          variant={"ghost"}
          {...attributes}
          {...listeners}
          className="p-1 text-secondary-foreground/50 -ml-2 h-auto cursor-grab"
        >
          <span className="sr-only">Move task</span>
          <GripVertical />
        </Button>
        <Badge
          variant={"outline"}
          className={` font-normal ml-auto ${
            task.status === TaskStatusEnum.Completed
              ? "text-green-500"
              : task.status === TaskStatusEnum.InProgress
              ? "text-yellow-500"
              : task.status === TaskStatusEnum.NotStarted
              ? "text-red-500"
              : ""
          }`}
        >
          {TASK_STATUS_OPTIONS.find((option) => option.value === task.status)?.label}
        </Badge>
      </CardHeader>
      <CardContent className="px-3 pt-3 pb-4 flex flex-col gap-4">
        <div className="text-left whitespace-pre-wrap">
          <div className="font-medium">{task.name}</div>
          <p className="text-muted-foreground">{task.description}</p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <Badge variant={"secondary"} className="font-normal">
            <Flag className="h-4 w-4 mr-1" />
            {PRIORITY_OPTIONS.find((option) => option.value === task.priority)?.label}
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            {formatDate(task.createdDate)}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
