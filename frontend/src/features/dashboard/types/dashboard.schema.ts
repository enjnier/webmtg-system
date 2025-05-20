import { type } from 'arktype'

// ユーザー型
export const userSchema = type({
  id: 'number',
  name: 'string',
  email: 'string.email',
  role: "'admin' | 'user'",
  createdAt: 'Date',
  'avatar?': 'string',
})

// ダッシュボード統計データ型
export const dashboardStatsSchema = type({
  totalUsers: 'number',
  revenue: 'number',
  orders: 'number',
  activeNow: 'number',
  userGrowth: 'string',
  revenueGrowth: 'string',
  orderGrowth: 'string',
  activeGrowth: 'string',
})

// アクティビティ型
export const activitySchema = type({
  id: 'number',
  action: 'string',
  detail: 'string',
  time: 'string',
  'userId?': 'number',
})

// 認証状態型
export const authStateSchema = type({
  isAuthenticated: 'boolean',
  'user?': userSchema,
  'token?': 'string',
})

// API レスポンス型（汎用）
export const apiResponseSchema = type({
  success: 'boolean',
  'data?': 'unknown',
  'message?': 'string',
  'error?': 'string',
})

// 型の推論
export type User = typeof userSchema.infer
export type DashboardStats = typeof dashboardStatsSchema.infer
export type Activity = typeof activitySchema.infer
export type AuthState = typeof authStateSchema.infer
export type ApiResponse<T = unknown> = {
  success: boolean
  data?: T
  message?: string
  error?: string
}
