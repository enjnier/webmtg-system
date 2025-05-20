import React from 'react'
import { useLocation, Link } from 'react-router'
import { cn } from '@/lib/cn'
import { Button } from '@/shared/components/ui/button'

interface DashboardLayoutProps {
  children: React.ReactNode
  className?: string
  onLogout?: () => void
}

interface HeaderProps {
  className?: string
  onLogout?: () => void
}

interface SidebarProps {
  className?: string
}

interface MainContentProps {
  children: React.ReactNode
  className?: string
}

// ヘッダーコンポーネント
const Header: React.FC<HeaderProps> = ({ className, onLogout }) => {
  return (
    <header className={cn('border-b bg-background px-6 py-4', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            Settings
          </Button>
          <Button variant="outline" size="sm">
            Profile
          </Button>
          <Button variant="outline" size="sm" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}

// サイドバーコンポーネント
const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const location = useLocation()

  const menuItems = [
    { label: 'Overview', href: '/dashboard' },
    { label: 'Analytics', href: '/dashboard/analytics' },
    { label: 'Reports', href: '/dashboard/reports' },
    { label: 'Users', href: '/dashboard/users' },
    { label: 'Settings', href: '/dashboard/settings' },
  ]

  return (
    <aside className={cn('w-64 border-r bg-background p-6', className)}>
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Button key={item.href} variant={isActive ? 'default' : 'ghost'} className="w-full justify-start" asChild>
              <Link to={item.href}>{item.label}</Link>
            </Button>
          )
        })}
      </nav>
    </aside>
  )
}

// メインコンテンツエリア
const MainContent: React.FC<MainContentProps> = ({ children, className }) => {
  return <main className={cn('flex-1 p-6 overflow-auto', className)}>{children}</main>
}

// メインのダッシュボードレイアウト
export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, className, onLogout }) => {
  return (
    <div className={cn('min-h-screen bg-background', className)}>
      <Header onLogout={onLogout} />
      <div className="flex h-[calc(100vh-73px)]">
        <Sidebar />
        <MainContent>{children}</MainContent>
      </div>
    </div>
  )
}

// サブコンポーネントもエクスポート
export { Header, Sidebar, MainContent }
