import React from "react"
import { FileText } from "lucide-react"
import { Ripple } from "@/components/ui/ripple"

interface EmptyStateProps {
  title: string
  description?: string
  icon?: React.ReactNode
}

export default function EmptyState({
  title = "No data found",
  description = "There is no data was found at the moment.",
  icon = <FileText size={24} />
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[250px] p-4 text-center relative">
      <Ripple className="absolute bottom-20" />

      <div className="relative rounded-full dark:bg-slate-700/20 bg-slate-200/40 p-4">{icon}</div>

      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="leading-7 text-base max-w-[600px] text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  )
}
