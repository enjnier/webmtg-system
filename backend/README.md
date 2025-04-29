# webmtg-system > backend

オニオンアーキテクチャを採用したディレクトリ構造であり、FastAPIを使用したシステムとなっている。

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

## セットアップの備忘録

backendディレクトリをセットアップした時の手順を備忘録として残す。

### uvプロジェクトの作成

```bash
$ uv init backend
Initialized project `backend` at `/home/enjn/dev/webmtg-system/backend`
```

```bash
$ cd backend
$ tree -a
.
├── .python-version
├── README.md
├── main.py
└── pyproject.toml
```

### main.pyを削除

```bash
rm -fr main.py
```

### 必要なパッケージを追加

```bash
$ uv add fastapi[all] sqlalchemy psycopg2-binary alembic pyjwt passlib dependency-injector asyncpg redis
Using CPython 3.12.3 interpreter at: /usr/bin/python3
Creating virtual environment at: .venv
Resolved 52 packages in 698ms
Prepared 44 packages in 919ms
Installed 50 packages in 45ms
 + alembic==1.15.2
 + annotated-types==0.7.0
 + anyio==4.9.0
 + asyncpg==0.30.0
 + certifi==2025.4.26
 + click==8.1.8
 + dependency-injector==4.46.0
 + dnspython==2.7.0
 + email-validator==2.2.0
 + fastapi==0.115.12
 + fastapi-cli==0.0.7
 + greenlet==3.2.1
 + h11==0.16.0
 + httpcore==1.0.9
 + httptools==0.6.4
 + httpx==0.28.1
 + idna==3.10
 + itsdangerous==2.2.0
 + jinja2==3.1.6
 + mako==1.3.10
 + markdown-it-py==3.0.0
 + markupsafe==3.0.2
 + mdurl==0.1.2
 + orjson==3.10.16
 + passlib==1.7.4
 + psycopg2-binary==2.9.10
 + pydantic==2.11.3
 + pydantic-core==2.33.1
 + pydantic-extra-types==2.10.4
 + pydantic-settings==2.9.1
 + pygments==2.19.1
 + pyjwt==2.10.1
 + python-dotenv==1.1.0
 + python-multipart==0.0.20
 + pyyaml==6.0.2
 + redis==5.2.1
 + rich==14.0.0
 + rich-toolkit==0.14.3
 + shellingham==1.5.4
 + sniffio==1.3.1
 + sqlalchemy==2.0.40
 + starlette==0.46.2
 + typer==0.15.2
 + typing-extensions==4.13.2
 + typing-inspection==0.4.0
 + ujson==5.10.0
 + uvicorn==0.34.2
 + uvloop==0.21.0
 + watchfiles==1.0.5
 + websockets==15.0.1
```

### 開発用パッケージを追加

```bash
$ uv add --dev ipython debugpy
Resolved 68 packages in 461ms
Prepared 16 packages in 1.18s
Installed 16 packages in 67ms
 + asttokens==3.0.0
 + debugpy==1.8.14
 + decorator==5.2.1
 + executing==2.2.0
 + ipython==9.2.0
 + ipython-pygments-lexers==1.1.1
 + jedi==0.19.2
 + matplotlib-inline==0.1.7
 + parso==0.8.4
 + pexpect==4.9.0
 + prompt-toolkit==3.0.51
 + ptyprocess==0.7.0
 + pure-eval==0.2.3
 + stack-data==0.6.3
 + traitlets==5.14.3
 + wcwidth==0.2.13
```

### ディレクトリと初期ファイルの追加

```bash
# alembicディレクトリ
mkdir -p alembic
touch alembic/.gitkeep

# scriptsディレクトリ
mkdir -p scripts
touch scripts/.gitkeep

# application
mkdir -p src/application/dtos
mkdir -p src/application/interfaces/repositories
mkdir -p src/application/interfaces/services
mkdir -p src/application/services
mkdir -p src/application/use_cases/user
mkdir -p src/application/use_cases/item

# domain
mkdir -p src/domain/entities
mkdir -p src/domain/exceptions
mkdir -p src/domain/value_objects

# infrastructure
mkdir -p src/infrastructure/config
mkdir -p src/infrastructure/database/models
mkdir -p src/infrastructure/repositories

# presentation
mkdir -p src/presentation/api/endpoints
mkdir -p src/presentation/schemas

# tests
mkdir -p tests/unit/application
mkdir -p tests/unit/domain
mkdir -p tests/unit/infrastructure
mkdir -p tests/integration/api

# __init__.pyファイルの作成
# src及びサブディレクトリ
find src -type d | while read dir; do
  touch "$dir/__init__.py"
done

# tests及びサブディレクトリ
find tests -type d | while read dir; do
  touch "$dir/__init__.py"
done

# その他必要なファイル
touch src/presentation/api/dependencies.py
touch src/presentation/api/error_handlers.py
touch src/presentation/main.py
touch tests/conftest.py

# ルートファイル
touch .env.example
touch .gitignore
touch Dockerfile
```
