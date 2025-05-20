// Components
export { DashboardLayout, Header, Sidebar, MainContent } from './components/DashboardLayout'

// Routes
export { DashboardPage } from './routes/DashboardPage'

// API
export { getDashboardStats, getRecentActivities, getAnalyticsData } from './api/dashboard.api'

// Types
export type { DashboardStats, Activity, User } from './types/dashboard.schema'
