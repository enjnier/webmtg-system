# 環境構築

前提

- 実行環境は**Mac**または**WSL**を想定
- [pnpm](https://pnpm.io/ja/)がインストールされていること
- [Docker Desktop](https://docs.docker.com/desktop/)がインストールされていること（任意）

## インストール

```bash
pnpm install
```

## ローカルサーバー

起動後は <http://localhost:5173> にアクセス

### コマンドからサーバーを起動する場合

```bash
pnpm dev
```

### Dockerからサーバーを起動する場合

```bash
# リポジトリ直下にて（docker-compose.ymlのディレクトリ）
docker compose up -d webmtg-frontend
```
