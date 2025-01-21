import { useCurrentUser } from "@/feature/auth"
import { useEffect } from "react"

export default function DashboardPage() {
  const { mutate: getCurrentUser } = useCurrentUser()

  useEffect(() => {
    console.log("app reloaded in invalid token, but i'm getting data from api")
    const profile = getCurrentUser()

    console.log(profile)
  }, [getCurrentUser])

  return (
    <div className="flex">
      <h2>dashboard page</h2>
    </div>
  )
}
