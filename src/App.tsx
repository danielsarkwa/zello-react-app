import { Routes, Route, Navigate } from "react-router"
import AppLayout from "@/components/layout/app-layout"
import Dashboard from "@/pages/dashboard"
import TaskBoard from "@/pages/task-board"
import Projects from "@/pages/projects"
import ProjectDetails from "@/pages/project-details"
import TaskDetails from "@/pages/task-details"
import Members from "@/pages/members"
import Account from "@/pages/account"
import AuthLayout from "@/components/layout/auth-layout"
import { ProtectedRoute } from "@/components/routes/protected-route"

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Navigate to="login" replace />} />
        <Route path="login" element={<div>Login Page</div>} />
        <Route path="register" element={<div>Register Page</div>} />
        <Route path="forgot-password" element={<div>Forgot Password Page</div>} />
      </Route>

      {/* Protected routes wrapped in AppLayout */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        {/* Default redirect */}
        <Route index element={<Navigate to="/dashboard" replace />} />

        {/* Main routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="task-board" element={<TaskBoard />} />
        <Route path="/projects">
          <Route index element={<Projects />} />
          <Route path=":projectId" element={<ProjectDetails />} />
          <Route path=":projectId/tasks/:taskId" element={<TaskDetails />} />
        </Route>
        <Route path="/members" element={<Members />} />
        <Route path="/account" element={<Account />} />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  )
}

export default App
