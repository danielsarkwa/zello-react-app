// Reponsible for show the workspaces analitics, recent activities, quick actions, etc
// For now, this can just get the workspsace details

import CreateProjectDialog from "@/components/dialogs/create-project-dialog"
import Header from "@/components/header"

export default function DashboardPage() {
  return (
    <>
      <Header actions={<CreateProjectDialog />} />
      <main className="p-5 flex-1">
        <h2>dashboard page</h2>
      </main>
    </>
  )
}
