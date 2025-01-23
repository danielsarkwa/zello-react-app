import { Outlet } from "react-router"

export default function WorkspaceLayout() {
  return (
    <main className="w-screen h-screen">
      <Outlet />
    </main>
  )
}
