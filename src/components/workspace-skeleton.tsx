import { ChevronRight, Hash } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { CardContainer } from "@/components/ui/card-container"

export default function WorkspaceListSkeleton() {
  return (
    <CardContainer>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-center space-x-4 p-4 rounded-lg dark:bg-white/5 bg-slate-500/10 hover:bg-slate-400/20"
        >
          <Hash className="opacity-25" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-6 w-[200px] bg-slate-400/20" />
          </div>
          <ChevronRight className="opacity-25" />
        </div>
      ))}
    </CardContainer>
  )
}
