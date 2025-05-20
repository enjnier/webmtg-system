import React, { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { Card } from '@/shared/components/ui/card'
import { DashboardLayout } from '../components/DashboardLayout'
import { logoutAtom, currentUserAtom } from '@/shared/atoms/auth'
import { getDashboardStats, getRecentActivities } from '../api/dashboard.api'
import { logoutApi } from '@/features/auth/api/auth.api'
import type { DashboardStats, Activity } from '../types/dashboard.schema'

export const DashboardPage: React.FC = () => {
  const [, logout] = useAtom(logoutAtom)
  const [currentUser] = useAtom(currentUserAtom)
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [activities, setActivities] = useState<Activity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // データ取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // 並行してデータを取得
        const [statsData, activitiesData] = await Promise.all([getDashboardStats(), getRecentActivities()])

        setStats(statsData)
        setActivities(activitiesData)
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err)
        setError('データの取得に失敗しました。')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleLogout = async () => {
    try {
      await logoutApi()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      logout()
    }
  }

  if (isLoading) {
    return (
      <DashboardLayout onLogout={handleLogout}>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">読み込み中...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout onLogout={handleLogout}>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
            <button onClick={() => window.location.reload()} className="mt-4 text-primary hover:underline">
              再試行
            </button>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout onLogout={handleLogout}>
      <div className="space-y-6">
        {/* ページタイトル */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
          <p className="text-muted-foreground">
            Welcome back, {currentUser?.name || 'User'}! Here's what's happening today.
          </p>
        </div>

        {/* サマリーカード */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <h3 className="text-2xl font-bold">{stats?.totalUsers?.toLocaleString() || '0'}</h3>
              </div>
              <div className="h-4 w-4 text-muted-foreground">
                <span className="sr-only">Users icon</span>
                👥
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">{stats?.userGrowth || 'N/A'} from last month</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                <h3 className="text-2xl font-bold">${stats?.revenue?.toLocaleString() || '0'}</h3>
              </div>
              <div className="h-4 w-4 text-muted-foreground">
                <span className="sr-only">Revenue icon</span>
                💰
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">{stats?.revenueGrowth || 'N/A'} from last month</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Orders</p>
                <h3 className="text-2xl font-bold">{stats?.orders?.toLocaleString() || '0'}</h3>
              </div>
              <div className="h-4 w-4 text-muted-foreground">
                <span className="sr-only">Orders icon</span>
                📦
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">{stats?.orderGrowth || 'N/A'} from last month</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Now</p>
                <h3 className="text-2xl font-bold">{stats?.activeNow?.toLocaleString() || '0'}</h3>
              </div>
              <div className="h-4 w-4 text-muted-foreground">
                <span className="sr-only">Active users icon</span>
                🟢
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">{stats?.activeGrowth || 'N/A'} from last hour</p>
          </Card>
        </div>

        {/* メインコンテンツエリア */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          {/* チャートエリア */}
          <Card className="col-span-4 p-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold">Analytics</h4>
                <p className="text-sm text-muted-foreground">Your performance for this month</p>
              </div>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Chart component would go here</p>
                  <p className="text-xs text-muted-foreground mt-1">(e.g., Recharts, Chart.js)</p>
                </div>
              </div>
            </div>
          </Card>

          {/* 最近のアクティビティ */}
          <Card className="col-span-3 p-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold">Recent Activity</h4>
                <p className="text-sm text-muted-foreground">Latest updates from your account</p>
              </div>
              <div className="space-y-4">
                {activities.length > 0 ? (
                  activities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.detail}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-sm text-muted-foreground">No recent activity</p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
