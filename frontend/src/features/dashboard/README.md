# Dashboard Feature

## 概要

ダッシュボード機能は、ログイン後のメイン画面として機能するモダンなインターフェースを提供します。React Router、Jotai、ArkType、Axiosを使用して構築されています。

## 技術スタック

- **React Router**: ナビゲーションとルーティング
- **Jotai**: グローバル状態管理
- **ArkType**: 型定義とランタイムバリデーション
- **Axios**: HTTP通信
- **Tailwind CSS & shadcn/ui**: スタイリング

## 構成

### ディレクトリ構造

```txt
features/dashboard/
├── components/
│   └── DashboardLayout.tsx    # レイアウトコンポーネント (React Router対応)
├── routes/
│   └── DashboardPage.tsx      # メインページコンポーネント (API統合)
├── api/
│   └── dashboard.api.ts       # API関数 (Axios & ArkType)
├── types/
│   └── dashboard.schema.ts    # ArkType型定義
└── index.ts                   # エクスポート定義
```

### 主要コンポーネント

#### DashboardLayout.tsx

- **Header**: ダッシュボードタイトル、ユーザーアクション（Jotai統合ログアウト）
- **Sidebar**: React Routerによるナビゲーションメニュー（アクティブ状態の自動判定）
- **MainContent**: 動的なコンテンツエリア

#### DashboardPage.tsx

- **統計カード**: APIから取得した主要メトリクス（ArkTypeでバリデーション）
- **分析エリア**: チャートコンポーネント用のプレースホルダー
- **最近のアクティビティ**: リアルタイムデータ表示
- **ローディング状態**: 非同期データ取得中の表示
- **エラーハンドリング**: API エラー時の適切な表示

## API統合

### エンドポイント

- `GET /dashboard/stats` - ダッシュボード統計データ
- `GET /dashboard/activities` - 最近のアクティビティ
- `GET /dashboard/analytics` - 分析データ（将来実装）

### 型安全性

```typescript
// ArkTypeスキーマ例
export const dashboardStatsSchema = type({
  totalUsers: "number",
  revenue: "number", 
  orders: "number",
  activeNow: "number",
  userGrowth: "string",
  revenueGrowth: "string",
  orderGrowth: "string",
  activeGrowth: "string"
})

// API関数例
export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await apiClient.get('/dashboard/stats')
  return dashboardStatsSchema.assert(response.data) // ランタイムバリデーション
}
```

## 状態管理

### Jotai Atoms

```typescript
// 認証状態管理
export const authStateAtom = atomWithStorage<AuthState>('auth-state', {
  isAuthenticated: false,
  user: undefined,
  token: undefined
})

// ログアウト処理
export const logoutAtom = atom(
  null,
  (get, set) => {
    set(authStateAtom, {
      isAuthenticated: false,
      user: undefined,
      token: undefined
    })
  }
)
```

## ルーティング

### プライベート・パブリックルート

```typescript
// プライベートルート（認証必須）
<Route path="/dashboard" element={
  <PrivateRoute>
    <DashboardPage />
  </PrivateRoute>
} />

// パブリックルート（未認証のみ）
<Route path="/login" element={
  <PublicRoute>
    <LoginPage />
  </PublicRoute>
} />
```

### ナビゲーション

- サイドバーメニューは動的にアクティブ状態を判定
- React Router Linkを使用してSPAナビゲーション
- ログアウト時の自動リダイレクト

## 特徴

- **型安全性**: TypeScript + ArkTypeによるランタイム型チェック
- **レスポンシブデザイン**: デスクトップとモバイル対応
- **ローディング状態**: 非同期処理中の適切なUI
- **エラーハンドリング**: API エラーの自動処理とフォールバック
- **認証統合**: Jotaiによるシームレスな認証状態管理
- **ルーティング**: React Routerによる宣言的ナビゲーション
- **アクセシビリティ**: スクリーンリーダー対応とキーボードナビゲーション

## 使用方法

```tsx
import { DashboardPage } from '@/features/dashboard'
import { useAtom } from 'jotai'
import { isLoggedInAtom } from '@/shared/atoms/auth'

// React Router環境での使用
<Routes>
  <Route path="/dashboard" element={
    <PrivateRoute>
      <DashboardPage />
    </PrivateRoute>
  } />
</Routes>

// 認証状態の確認
function MyComponent() {
  const [isLoggedIn] = useAtom(isLoggedInAtom)
  return isLoggedIn ? <DashboardPage /> : <LoginPage />
}
```

## カスタマイズ

### メニューアイテムの追加

```typescript
// DashboardLayout.tsx
const menuItems = [
  { label: "Overview", href: "/dashboard" },
  { label: "Analytics", href: "/dashboard/analytics" },
  // 新しいメニューアイテム
  { label: "Custom Page", href: "/dashboard/custom" },
]
```

### API エンドポイントの変更

```typescript
// .env
VITE_API_URL=http://localhost:8000/api

// dashboard.api.ts で自動的に使用される
```

### 統計カードのカスタマイズ

ArkTypeスキーマを更新してフィールドを追加/削除できます。

## 今後の拡張予定

- [x] React Router統合
- [x] Jotai状態管理
- [x] ArkType型システム
- [x] Axios API統合
- [ ] リアルタイムデータ更新（WebSocket）
- [ ] チャートライブラリ統合（Recharts）
- [ ] ダークモード対応
- [ ] カスタムダッシュボードウィジェット
- [ ] パフォーマンス最適化（React.memo、useMemo）
- [ ] オフライン対応
- [ ] 多言語対応（i18n）

## トラブルシューティング

### ログイン状態が保持されない

- ローカルストレージの確認：`auth-state` キー
- Jotai atomWithStorage の正常動作確認

### API呼び出しが失敗する

- 環境変数 `VITE_API_URL` の設定確認
- CORS設定の確認
- ネットワークタブでHTTPステータス確認

### ルーティングが動作しない

- React Router のBrowserRouter設定確認
- プライベートルートの認証状態確認
- 404ページの正しい設定確認
