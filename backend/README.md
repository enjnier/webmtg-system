# Backend

オニオンアーキテクチャを採用したディレクトリ構造かつFastAPIを使用したバックエンドのシステム

```bash
backend
├── alembic
├── scripts
├── src
│   ├── application
│   │   ├── dtos
│   │   ├── interfaces
│   │   │   ├── repositories
│   │   │   └── services
│   │   ├── services
│   │   └── use_cases
│   ├── domain
│   │   ├── entities
│   │   ├── exceptions
│   │   └── value_objects
│   ├── infrastructure
│   │   ├── config
│   │   ├── database
│   │   │   └── models
│   │   └── repositories
│   └── presentation
│       ├── api
│       │   └── endpoints
│       └── schemas
└── tests
    ├── integration
    │   └── api
    └── unit
        ├── application
        ├── domain
        └── infrastructure
```

## 環境構築

実行環境は`Mac`または`WSL（ubuntu）`を想定している。

前提として以下のツールが導入されていること。

- [uv](https://github.com/astral-sh/uv)：仮想環境の構築に使用
- [rye](https://github.com/astral-sh/rye)：仮想環境では使わず、コマンド関係で使用

### 仮想環境の作成

uvコマンドを使用して仮想環境を作成する。

```bash
uv sync
```

### PYTHONPATHの設定

PYTHONPATHを設定するシェルスクリプトを実行する。

```bash
./scripts/setup_python_path.sh
```

現在のディレクトリ（`backend`）とソースディレクトリ（`backend/src`）が対象となる。

### マイグレーション
