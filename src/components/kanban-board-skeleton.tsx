export default function KanbanBoardSkeleton() {
  return (
    <div className="w-full h-full flex gap-4 p-4">
      <div className="flex-1 flex gap-4 overflow-x-auto">
        {[1, 2, 3].map((i) => (
          <div 
            key={i}
            className="flex flex-col w-[350px] h-full flex-shrink-0 flex-grow bg-card rounded-lg border animate-pulse"
          >
            <div className="p-4 border-b">
              <div className="h-6 bg-muted rounded w-24" />
            </div>
            <div className="p-2 flex flex-col gap-2 h-full overflow-y-auto">
              {[1, 2, 3, 4, 5].map((j) => (
                <div 
                  key={j}
                  className="h-24 bg-muted rounded-lg"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
 }