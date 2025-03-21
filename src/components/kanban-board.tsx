import { useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"

import { BoardColumn, BoardContainer } from "@/components/board-column"
import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  useSensor,
  useSensors,
  KeyboardSensor,
  Announcements,
  UniqueIdentifier,
  TouchSensor,
  MouseSensor
} from "@dnd-kit/core"
import { SortableContext, arrayMove } from "@dnd-kit/sortable"
import { TaskCard } from "@/components/task-card"
import type { Column } from "@/components/board-column"
import { hasDraggableData } from "@/components/dnd-utils"
import { coordinateGetter } from "@/components/multipleContainersKeyboardPreset"

import { TaskListWithDetails } from "@/schemas/task-list"
import { Task } from "@/schemas/tasks"
import CreateListDialog from "./dialogs/create-list-dialog"

interface KanbanBoardProps {
  lists: TaskListWithDetails[]
}

export type ColumnId = TaskListWithDetails["id"]

export function KanbanBoard({ lists }: KanbanBoardProps) {
  const [columns, setColumns] = useState(lists)
  const pickedUpTaskColumn = useRef<ColumnId | null>(null)
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns])

  const [tasks, setTasks] = useState<Task[]>([])

  const [activeColumn, setActiveColumn] = useState<Column | null>(null)

  const [activeTask, setActiveTask] = useState<Task | null>(null)

  useEffect(() => {
    setColumns(lists)
  }, [lists])

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: coordinateGetter
    })
  )

  function getDraggingTaskData(taskId: UniqueIdentifier, columnId: ColumnId) {
    const tasksInColumn = tasks.filter((task) => task.listId === columnId)
    const taskPosition = tasksInColumn.findIndex((task) => task.id === taskId)
    const column = columns.find((col) => col.id === columnId)
    return {
      tasksInColumn,
      taskPosition,
      column
    }
  }

  const announcements: Announcements = {
    onDragStart({ active }) {
      if (!hasDraggableData(active)) return
      if (active.data.current?.type === "Column") {
        const startColumnIdx = columnsId.findIndex((id) => id === active.id)
        const startColumn = columns[startColumnIdx]
        return `Picked up Column ${startColumn?.name} at position: ${startColumnIdx + 1} of ${
          columnsId.length
        }`
      } else if (active.data.current?.type === "Task") {
        pickedUpTaskColumn.current = active.data.current.task.listId
        const { tasksInColumn, taskPosition, column } = getDraggingTaskData(
          active.id,
          pickedUpTaskColumn.current
        )
        return `Picked up Task ${active.data.current.task.name} at position: ${
          taskPosition + 1
        } of ${tasksInColumn.length} in column ${column?.name}`
      }
    },
    onDragOver({ active, over }) {
      if (!hasDraggableData(active) || !hasDraggableData(over)) return

      if (active.data.current?.type === "Column" && over.data.current?.type === "Column") {
        const overColumnIdx = columnsId.findIndex((id) => id === over.id)
        return `Column ${active.data.current.column.name} was moved over ${
          over.data.current.column.name
        } at position ${overColumnIdx + 1} of ${columnsId.length}`
      } else if (active.data.current?.type === "Task" && over.data.current?.type === "Task") {
        const { tasksInColumn, taskPosition, column } = getDraggingTaskData(
          over.id,
          over.data.current.task.listId
        )
        if (over.data.current.task.listId !== pickedUpTaskColumn.current) {
          return `Task ${active.data.current.task.name} was moved over column ${
            column?.name
          } in position ${taskPosition + 1} of ${tasksInColumn.length}`
        }
        return `Task was moved over position ${taskPosition + 1} of ${
          tasksInColumn.length
        } in column ${column?.name}`
      }
    },
    onDragEnd({ active, over }) {
      if (!hasDraggableData(active) || !hasDraggableData(over)) {
        pickedUpTaskColumn.current = null
        return
      }
      if (active.data.current?.type === "Column" && over.data.current?.type === "Column") {
        const overColumnPosition = columnsId.findIndex((id) => id === over.id)

        return `Column ${active.data.current.column.name} was dropped into position ${
          overColumnPosition + 1
        } of ${columnsId.length}`
      } else if (active.data.current?.type === "Task" && over.data.current?.type === "Task") {
        const { tasksInColumn, taskPosition, column } = getDraggingTaskData(
          over.id,
          over.data.current.task.listId
        )
        if (over.data.current.task.listId !== pickedUpTaskColumn.current) {
          return `Task was dropped into column ${column?.name} in position ${taskPosition + 1} of ${
            tasksInColumn.length
          }`
        }
        return `Task was dropped into position ${taskPosition + 1} of ${
          tasksInColumn.length
        } in column ${column?.name}`
      }
      pickedUpTaskColumn.current = null
    },
    onDragCancel({ active }) {
      pickedUpTaskColumn.current = null
      if (!hasDraggableData(active)) return
      return `Dragging ${active.data.current?.type} cancelled.`
    }
  }

  return (
    <DndContext
      accessibility={{
        announcements
      }}
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <BoardContainer>
        <SortableContext items={columns.map((col) => col.id)}>
          {columns.map((col, index) => (
            <BoardColumn
              key={col.id}
              column={{
                id: col.id,
                name: col.name,
                position: col.position,
                projectId: col.projectId
              }}
              columnIndex={index}
              tasks={col.tasks || []}
            />
          ))}
          <div className="w-72 h-[200px] bg-primary-foreground rounded-lg flex items-center justify-center">
            <CreateListDialog projectId={lists[0].projectId} />
          </div>
        </SortableContext>
      </BoardContainer>
      {createPortal(
        <DragOverlay>
          {activeColumn && (
            <BoardColumn
              column={activeColumn}
              tasks={columns.find((col) => col.id === activeColumn.id)?.tasks || []}
              isOverlay
              columnIndex={0}
            />
          )}
          {activeTask && <TaskCard task={activeTask} isOverlay />}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  )

  function onDragStart(event: DragStartEvent) {
    if (!hasDraggableData(event.active)) return
    const data = event.active.data.current
    if (data?.type === "Column") {
      setActiveColumn(data.column)
      return
    }

    if (data?.type === "Task") {
      setActiveTask(data.task)
      return
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null)
    setActiveTask(null)

    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (!hasDraggableData(active)) return

    const activeData = active.data.current

    if (activeId === overId) return

    const isActiveAColumn = activeData?.type === "Column"
    if (!isActiveAColumn) return

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId)

      const overColumnIndex = columns.findIndex((col) => col.id === overId)

      return arrayMove(columns, activeColumnIndex, overColumnIndex)
    })
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    if (!hasDraggableData(active) || !hasDraggableData(over)) return

    const activeData = active.data.current
    const overData = over.data.current

    const isActiveATask = activeData?.type === "Task"
    const isOverATask = overData?.type === "Task"

    if (!isActiveATask) return

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId)
        const overIndex = tasks.findIndex((t) => t.id === overId)
        const activeTask = tasks[activeIndex]
        const overTask = tasks[overIndex]
        if (activeTask && overTask && activeTask.listId !== overTask.listId) {
          activeTask.listId = overTask.listId
          return arrayMove(tasks, activeIndex, overIndex - 1)
        }

        return arrayMove(tasks, activeIndex, overIndex)
      })
    }

    const isOverAColumn = overData?.type === "Column"

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId)
        const activeTask = tasks[activeIndex]
        if (activeTask) {
          activeTask.listId = overId as ColumnId
          return arrayMove(tasks, activeIndex, activeIndex)
        }
        return tasks
      })
    }
  }
}
