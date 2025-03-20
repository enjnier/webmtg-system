# 開発環境構築

このページでは、WebMTG Systemの開発環境を構築するための手順を説明します。

## 前提条件

開発を始める前に、以下のツールがインストールされていることを確認してください。

- **Git**: バージョン管理
- **Python**: バージョン 3.12 以上
- **Node.js**: バージョン 18 以上
- **Docker & Docker Compose**: コンテナ環境
- **rye/uv**: Pythonパッケージ管理（推奨）
- **pnpm**: Node.jsパッケージ管理（推奨）

## リポジトリのクローン

まず、GitHubリポジトリをクローンします。

```bash
git clone https://github.com/enjnier/webmtg-system.git
cd webmtg-system
```

## バックエンド環境構築

### 1. Python環境のセットアップ

ryeを使用して環境をセットアップします。

```bash
cd backend
rye sync
```

または、uvを使用する場合

```bash
cd backend
uv venv
uv pip install -r requirements.txt
```

### 2. 環境変数設定

`.env` ファイルをテンプレートからコピーし、必要に応じて編集します。

```bash
cp .env.example .env
# .envファイルを編集して適切な設定を行う
```

主要な環境変数

| 変数名 | 説明 | デフォルト値 |
|--------|------|------------|
| `DATABASE_URL` | データベース接続URL | `postgresql://postgres:postgres@localhost:5432/webmtg` |
| `REDIS_URL` | Redis接続URL | `redis://localhost:6379/0` |
| `SECRET_KEY` | JWT署名用の秘密鍵 | ランダム生成（開発用） |
| `DEBUG` | デバッグモード | `True`（開発用） |

### 3. データベースのセットアップ

Docker Composeを使用して開発用データベースを起動します。

```bash
docker-compose up -d db redis
```

マイグレーションを実行します。

```bash
cd backend
rye run alembic upgrade head
```

### 4. バックエンドサーバーの起動

```bash
cd backend
rye run uvicorn app.main:app --reload --port 8000
```

APIドキュメントは <http://localhost:8000/docs> で確認できます。

## フロントエンド環境構築

### 1. Node.js環境のセットアップ

```bash
cd frontend
pnpm install
```

### 2. 環境変数設定

`.env` ファイルをテンプレートからコピーします。

```bash
cp .env.example .env.local
# .env.localファイルを編集して適切な設定を行う
```

主要な環境変数

| 変数名 | 説明 | デフォルト値 |
|--------|------|------------|
| `VITE_API_URL` | バックエンドAPIのURL | `http://localhost:8000` |
| `VITE_WS_URL` | WebSocketのURL | `ws://localhost:8000/ws` |

### 3. 開発サーバー起動

```bash
cd frontend
pnpm dev
```

フロントエンドは <http://localhost:5173> で利用できます。

## ドキュメント環境構築

MkDocsドキュメントサーバーを起動するには

```bash
cd docs
rye run serve
```

ドキュメントは <http://127.0.0.1:8100> で確認できます。

## 全システムの起動（Docker Compose）

開発用に全システムをDocker Composeで起動するには

```bash
docker-compose up -d
```

これにより以下のサービスが起動します。

| サービス | ポート | URL |
|----------|------|-----|
| バックエンドAPI | 8000 | <http://localhost:8000> |
| フロントエンド | 5173 | <http://localhost:5173> |
| PostgreSQL | 5432 | - |
| Redis | 6379 | - |
| MinIO | 9000, 9001 | <http://localhost:9001> |
| ドキュメント | 8100 | <http://localhost:8100> |

## VS Code設定

VS Codeでの開発環境を最適化するための`.vscode/settings.json`のサンプル

```json
{
  "python.defaultInterpreterPath": "${workspaceFolder}/backend/.venv/bin/python",
  "python.linting.enabled": true,
  "python.linting.flake8Enabled": true,
  "python.formatting.provider": "black",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  },
  "typescript.tsdk": "frontend/node_modules/typescript/lib",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## トラブルシューティング

### データベース接続エラー

PostgreSQLに接続できない場合

```bash
# コンテナが起動しているか確認
docker ps

# PostgreSQLのログを確認
docker-compose logs db

# 手動で接続テスト
docker exec -it webmtg-db psql -U postgres -d webmtg
```

### 依存関係の問題

依存関係の問題が発生した場合

```bash
# バックエンド依存関係の再インストール
cd backend
rye sync --clean

# フロントエンド依存関係の再インストール
cd frontend
rm -rf node_modules
pnpm install
```

### ポート競合

ポート競合が発生した場合、`.env`ファイルで使用ポートを変更するか、競合するプロセスを終了してください。

```bash
# Linuxでポートを使用しているプロセスを確認
sudo lsof -i :8000

# Windowsでポートを使用しているプロセスを確認
netstat -ano | findstr :8000
```
