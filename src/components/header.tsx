import { ReactNode } from "react"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import BreadcrumbNav from "@/components/breadcrumb-nav"

interface HeaderProps {
  actions?: ReactNode | null
  breadcrumb?: ReactNode | null
}

export default function Header({ actions, breadcrumb }: HeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-3 border-b">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 h-4" />
        {breadcrumb || <BreadcrumbNav />}
      </div>
      {actions && <div className="flex justify-end items-center gap-4">{actions}</div>}
    </header>
  )
}
