import { useEffect } from "react"
import { Routes, Route, Navigate, useNavigate } from "react-router"

import AppLayout from "@/components/layout/app-layout"
import AuthLayout from "@/components/layout/auth-layout"
import WorkspaceLayout from "./components/layout/workspace-layout"

import WorkspacePage from "./pages/workspaces"
import CreateWorkspace from "@/components/create-workspace"
import DashboardPage from "@/pages/dashboard"
import ProjectsPage from "@/pages/projects"
import ProjectDetailsPage from "@/pages/project-details"
import TaskDetailsPage from "@/pages/task-details"
import MembersPage from "@/pages/members"
import AccountPage from "@/pages/account"

import LoginPage from "./pages/login"
import RegisterPage from "./pages/register"
import ForgotPasswordPage from "@/pages/forgot-password"

import NavigationService from "./feature/navigation"
import { ProtectedRoute } from "@/components/routes/protected-route"

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    NavigationService.setNavigate(navigate)
  }, [navigate])

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Navigate to="login" replace />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      {/* Load workspaces route */}
      <Route
        element={
          <ProtectedRoute>
            <WorkspaceLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/load-workspaces" element={<WorkspacePage />} />
        <Route path="/create-workspace" element={<CreateWorkspace />} />
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
        <Route path="/projects">
          <Route index element={<ProjectsPage />} />
          <Route path=":projectId">
            <Route index element={<ProjectDetailsPage />} />
            <Route path=":listId">
              <Route path=":taskId" element={<TaskDetailsPage />} />
            </Route>
          </Route>
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
