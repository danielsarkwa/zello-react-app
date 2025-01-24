import { Card, CardContent } from "@/components/ui/card"

export function CardContainer({ children }: { children: React.ReactNode }) {
  return (
    <Card className="w-[500px] max-w-3xl border-none dark:bg-slate-500/10 bg-slate-100/50 overflow-hidden transition-all duration-300">
      <CardContent className="p-4 space-y-3">{children}</CardContent>
    </Card>
  )
}
