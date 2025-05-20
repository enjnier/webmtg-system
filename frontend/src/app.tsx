import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router'
import { useAtom } from 'jotai'
import { isLoggedInAtom } from '@/shared/atoms/auth'
import { LoginPage } from '@/features/auth/routes/LoginPage'
import { DashboardPage } from '@/features/dashboard'

// プライベートルート用のコンポーネント
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn] = useAtom(isLoggedInAtom)
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />
}

// パブリックルート用のコンポーネント（ログイン済みの場合はダッシュボードへリダイレクト）
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn] = useAtom(isLoggedInAtom)
  return !isLoggedIn ? <>{children}</> : <Navigate to="/dashboard" replace />
}

function App() {
  return (
    <Router>
      <Routes>
        {/* パブリックルート */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        {/* プライベートルート */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />

        {/* 他のダッシュボードページ（将来の拡張用） */}
        <Route
          path="/dashboard/analytics"
          element={
            <PrivateRoute>
              <div>Analytics Page (Coming Soon)</div>
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/reports"
          element={
            <PrivateRoute>
              <div>Reports Page (Coming Soon)</div>
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/users"
          element={
            <PrivateRoute>
              <div>Users Page (Coming Soon)</div>
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/settings"
          element={
            <PrivateRoute>
              <div>Settings Page (Coming Soon)</div>
            </PrivateRoute>
          }
        />

        {/* ルートパスとフォールバック */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  )
}

export default App
