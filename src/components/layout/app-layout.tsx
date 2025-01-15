import { Outlet } from "react-router"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/app-sidebar"

export default function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-5">
        <SidebarTrigger /> 
        {/* move side bar trigger into each page */}
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
 