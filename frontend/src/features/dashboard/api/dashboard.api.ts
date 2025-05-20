import { apiClient } from '@/features/auth/api/auth.api'
import type { DashboardStats, Activity } from '../types/dashboard.schema'
import { dashboardStatsSchema, activitySchema } from '../types/dashboard.schema'

/**
 * ダッシュボード統計データを取得
 */
export const getDashboardStats = async (): Promise<DashboardStats> => {
  try {
    const response = await apiClient.get('/dashboard/stats')
    
    // レスポンスをArkTypeでバリデーション
    const validatedStats = dashboardStatsSchema.assert(response.data)
    return validatedStats
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error)
    
    // モックデータを返す（開発用）
    const mockStats: DashboardStats = {
      totalUsers: 2543,
      revenue: 45231,
      orders: 1234,
      activeNow: 573,
      userGrowth: '+12%',
      revenueGrowth: '+8%',
      orderGrowth: '+15%',
      activeGrowth: '+2%'
    }
    
    return dashboardStatsSchema.assert(mockStats)
  }
}

/**
 * 最近のアクティビティを取得
 */
export const getRecentActivities = async (): Promise<Activity[]> => {
  try {
    const response = await apiClient.get('/dashboard/activities')
    
    // 配列の各要素をArkTypeでバリデーション
    const activities = Array.isArray(response.data) 
      ? response.data.map(activity => activitySchema.assert(activity))
      : []
    
    return activities
  } catch (error) {
    console.error('Failed to fetch recent activities:', error)
    
    // モックデータを返す（開発用）
    const mockActivities: Activity[] = [
      {
        id: 1,
        action: "New user registered",
        detail: "john.doe@example.com",
        time: "2 minutes ago",
        userId: 123
      },
      {
        id: 2,
        action: "Order completed",
        detail: "Order #1234",
        time: "5 minutes ago",
        userId: 456
      },
      {
        id: 3,
        action: "Payment received",
        detail: "$299.00",
        time: "10 minutes ago",
        userId: 789
      },
      {
        id: 4,
        action: "New message",
        detail: "From support team",
        time: "15 minutes ago"
      }
    ]
    
    // モックデータもバリデーション
    return mockActivities.map(activity => activitySchema.assert(activity))
  }
}

/**
 * Analytics data for charts (placeholder for future implementation)
 */
export const getAnalyticsData = async () => {
  try {
    const response = await apiClient.get('/dashboard/analytics')
    return response.data
  } catch (error) {
    console.error('Failed to fetch analytics data:', error)
    // Return empty data for now
    return null
  }
}
