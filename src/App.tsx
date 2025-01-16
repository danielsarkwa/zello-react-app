import { Routes, Route, Navigate } from "react-router"
import AppLayout from "@/components/layout/app-layout"
import AuthLayout from "@/components/layout/auth-layout"
import DashboardPage from "@/pages/dashboard"
import TaskBoardPage from "@/pages/task-board"
import ProjectsPage from "@/pages/projects"
import ProjectDetailsPage from "@/pages/project-details"
import TaskDetailsPage from "@/pages/task-details"
import MembersPage from "@/pages/members"
import AccountPage from "@/pages/account"
import LoginPage from "./pages/login"
import RegisterPage from "./pages/register"
import ForgotPasswordPage from "@/pages/forgot-password"
import { ProtectedRoute } from "@/components/routes/protected-route"

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Navigate to="login" replace />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
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
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="task-board" element={<TaskBoardPage />} />
        <Route path="/projects">
          <Route index element={<ProjectsPage />} />
          <Route path=":projectId" element={<ProjectDetailsPage />} />
          <Route path=":projectId/tasks/:taskId" element={<TaskDetailsPage />} />
        </Route>
        <Route path="/members" element={<MembersPage />} />
        <Route path="/account" element={<AccountPage />} />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  )
}

export default App
