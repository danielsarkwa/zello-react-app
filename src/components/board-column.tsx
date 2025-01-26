import { SortableContext, useSortable } from "@dnd-kit/sortable"
import { useDndContext, type UniqueIdentifier } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { useMemo } from "react"
import { motion } from "framer-motion"
import { TaskCard } from "@/components/task-card"
import { cva } from "class-variance-authority"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Button } from "./ui/button"
import { Ellipsis, GripVertical } from "lucide-react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Task } from "@/schemas/tasks"
import CreateTaskDialog from "./dialogs/create-task-dialog"
import React from "react"

export interface Column {
  id: UniqueIdentifier
  name: string
  position: number
  projectId: string
}

export type ColumnType = "Column"

export interface ColumnDragData {
  type: ColumnType
  column: Column
}

interface BoardColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  column: Column
  tasks: Task[]
  isOverlay?: boolean
  columnIndex: number
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export function BoardColumn({ column, tasks, isOverlay, columnIndex }: BoardColumnProps) {
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
    "h-[calc(100vh-12rem)] w-[350px] bg-primary-foreground flex flex-col flex-shrink-0 snap-center",
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
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: columnIndex * 0.1 }}
    >
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
              variant="ghost"
              {...attributes}
              {...listeners}
              className="p-1 text-primary/50 -ml-2 h-auto cursor-grab relative"
              title="Reorder List"
            >
              <span className="sr-only">{`Move column: ${column.name}`}</span>
              <GripVertical />
            </Button>
            <span>{column.name}</span>
          </div>
          <div className="flex flex-row items-center gap-1">
            <CreateTaskDialog listId={column.id as string} projectId={column.projectId} />
            <Button variant="ghost" className="h-8 w-8">
              <Ellipsis />
            </Button>
          </div>
        </CardHeader>
        <ScrollArea className="flex-1">
          <CardContent className="flex flex-col gap-2 p-2">
            <SortableContext items={tasksIds}>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-2"
              >
                {tasks.map((task) => (
                  <motion.div key={task.id} variants={itemVariants}>
                    <TaskCard task={task} />
                  </motion.div>
                ))}
              </motion.div>
            </SortableContext>
          </CardContent>
          <ScrollBar />
        </ScrollArea>
      </Card>
    </motion.div>
  )
}

export function BoardContainer({ children }: { children: React.ReactNode }) {
  const dndContext = useDndContext()

  const variations = cva("h-full flex lg:justify-center", {
    variants: {
      dragging: {
        default: "snap-x snap-mandatory",
        active: "snap-none"
      }
    }
  })

  return (
    <ScrollArea className="h-full">
      <div
        className={variations({
          dragging: dndContext.active ? "active" : "default"
        })}
      >
        <div className="flex gap-4 items-start p-4 min-w-full">
          {React.Children.map(children, (child, index) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child as React.ReactElement<any>, { columnIndex: index })
            }
            return child
          })}
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
