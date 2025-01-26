import { SortableContext, useSortable } from "@dnd-kit/sortable"
import { useDndContext, type UniqueIdentifier } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { useMemo } from "react"
import { TaskCard } from "@/components/task-card"
import { cva } from "class-variance-authority"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Button } from "./ui/button"
import { Ellipsis, GripVertical, Plus } from "lucide-react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

import { Task } from "@/schemas/tasks"

export interface Column {
  id: UniqueIdentifier
  name: string
  position: number
}

export type ColumnType = "Column"

export interface ColumnDragData {
  type: ColumnType
  column: Column
}

interface BoardColumnProps {
  column: Column
  tasks: Task[]
  isOverlay?: boolean
}

export function BoardColumn({ column, tasks, isOverlay }: BoardColumnProps) {
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id)
  }, [tasks])

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column
    } satisfies ColumnDragData,
    attributes: {
      roleDescription: `Column: ${column.name}`
    }
  })

  const style = {
    transition,
    transform: CSS.Translate.toString(transform)
  }

  const variants = cva(
    "h-[660px] max-h-[660px] w-[350px] max-w-full bg-primary-foreground flex flex-col flex-shrink-0 snap-center",
    {
      variants: {
        dragging: {
          default: "border-2 border-transparent",
          over: "ring-2 opacity-30",
          overlay: "ring-2 ring-primary"
        }
      }
    }
  )

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`border-none shadow-none ${variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined
      })}`}
    >
      <CardHeader className="p-4 font-semibold border-b-[1px] flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <Button
            variant={"ghost"}
            {...attributes}
            {...listeners}
            className=" p-1 text-primary/50 -ml-2 h-auto cursor-grab relative"
            title="Reorder List"
          >
            <span className="sr-only">{`Move column: ${column.name}`}</span>
            <GripVertical />
          </Button>
          <span>{column.name}</span>
        </div>
        <div className="flex flex-row items-center gap-1">
            <Button variant="ghost" className="h-8 w-8" title="Add Task">
            <Plus />
            </Button>
          <Button variant="ghost" className="h-8 w-8">
            <Ellipsis />
          </Button>
        </div>
      </CardHeader>
      <ScrollArea>
        <CardContent className="flex flex-grow flex-col gap-2 p-2">
          <SortableContext items={tasksIds}>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </SortableContext>
        </CardContent>
      </ScrollArea>
    </Card>
  )
}

export function BoardContainer({ children }: { children: React.ReactNode }) {
  const dndContext = useDndContext()

  const variations = cva("px-2 md:px-0 flex lg:justify-center pb-4 flex-1", {
    variants: {
      dragging: {
        default: "snap-x snap-mandatory",
        active: "snap-none"
      }
    }
  })

  return (
    <ScrollArea
      className={variations({
        dragging: dndContext.active ? "active" : "default"
      })}
    >
      <div className="flex gap-4 items-start flex-row justify-center">{children}</div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
