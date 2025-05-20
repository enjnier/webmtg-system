import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import type { AuthState, User } from '@/features/dashboard/types/dashboard.schema'

// 認証状態のアトム（ローカルストレージに永続化）
export const authStateAtom = atomWithStorage<AuthState>('auth-state', {
  isAuthenticated: false,
  user: undefined,
  token: undefined,
})

// 現在のユーザー情報のアトム（読み取り専用）
export const currentUserAtom = atom((get) => {
  const authState = get(authStateAtom)
  return authState.user
})

// ログイン状態のアトム（読み取り専用）
export const isLoggedInAtom = atom((get) => {
  const authState = get(authStateAtom)
  return authState.isAuthenticated
})

// ログイン処理のアトム
export const loginAtom = atom(null, (_, set, user: User, token: string) => {
  set(authStateAtom, {
    isAuthenticated: true,
    user,
    token,
  })
})

// ログアウト処理のアトム
export const logoutAtom = atom(null, (_, set) => {
  set(authStateAtom, {
    isAuthenticated: false,
    user: undefined,
    token: undefined,
  })
})
