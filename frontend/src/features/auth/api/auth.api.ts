import axios from 'axios'
import type { LoginForm, LoginResponse } from '../types/auth.schema'
import { loginResponseSchema } from '../types/auth.schema'

// APIベースURL（環境変数から取得、フォールバック付き）
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

// Axiosインスタンスの作成
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// リクエストインターセプター（認証トークンの自動付与）
apiClient.interceptors.request.use(
  (config) => {
    // ローカルストレージからトークンを取得
    const authData = localStorage.getItem('auth-state')
    if (authData) {
      try {
        const { token } = JSON.parse(authData)
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
      } catch (error) {
        console.error('Failed to parse auth token:', error)
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// レスポンスインターセプター（エラーハンドリング）
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 認証エラーの場合、ローカルストレージをクリア
      localStorage.removeItem('auth-state')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

/**
 * ログイン API
 */
export const loginApi = async (credentials: LoginForm): Promise<LoginResponse> => {
  try {
    // シミュレートされたAPI呼び出し（本番環境では実際のAPIエンドポイントに変更）
    const response = await apiClient.post('/auth/login', credentials)
    
    // レスポンスをArkTypeでバリデーション
    const validatedResponse = loginResponseSchema.assert(response.data)
    return validatedResponse
  } catch (error) {
    // 現在はモックレスポンスを返す（開発用）
    console.log('Login attempt with:', credentials)
    
    // モックレスポンス
    const mockResponse: LoginResponse = {
      success: true,
      data: {
        user: {
          id: 1,
          name: 'John Doe',
          email: credentials.email,
          role: 'admin',
          createdAt: new Date(),
          avatar: undefined
        },
        token: 'mock-jwt-token-' + Date.now()
      },
      message: 'Login successful'
    }
    
    // モックレスポンスもバリデーション
    return loginResponseSchema.assert(mockResponse)
  }
}

/**
 * ログアウト API
 */
export const logoutApi = async (): Promise<void> => {
  try {
    await apiClient.post('/auth/logout')
  } catch (error) {
    console.error('Logout error:', error)
    // エラーが発生してもログアウト処理は続行
  }
}

export { apiClient }
