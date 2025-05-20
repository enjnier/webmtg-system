import React from 'react'
import { useNavigate } from 'react-router'
import { LoginForm } from '../components/login-form'

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()

  const handleLoginSuccess = () => {
    // ログイン成功時にダッシュボードへリダイレクト
    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-svh bg-slate-50">
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  )
}
