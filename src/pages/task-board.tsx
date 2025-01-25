import Header from "@/components/header"
import { KanbanBoard } from "@/components/kanban-board"

export default function TaskBoardPage() {
  return (
    <>
      <Header />
      <main className="p-5 flex-1">
        <KanbanBoard />
      </main>
    </>
  )
}
