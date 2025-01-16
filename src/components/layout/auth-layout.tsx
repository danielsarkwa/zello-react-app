import { Outlet } from "react-router"

export default function AuthLayout() {
  return (
    <div className="w-screen h-screen">
      <Outlet />
    </div>
  )
}
