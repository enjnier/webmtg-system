# 備忘録

[TOC]

----

## 初期構築（docs）

docsディレクトリをセットアップした時の手順を備忘録として残す。

### uvプロジェクトの作成

```bash
$ uv init docs
Initialized project `docs` at `/home/enjn/dev/webmtg-system/docs`

$ cd docs
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
$ uv add mkdocs mkdocs-material mkdocs-glightbox mkdocs-table-reader-plugin mkdocs-monorepo-plugin
Using CPython 3.12.3
Creating virtual environment at: .venv
Resolved 40 packages in 449ms
Prepared 39 packages in 2.21s
Installed 39 packages in 207ms
 + babel==2.17.0
 + backrefs==5.8
 + certifi==2025.1.31
 + charset-normalizer==3.4.1
 + click==8.1.8
 + colorama==0.4.6
 + ghp-import==2.1.0
 + idna==3.10
 + jinja2==3.1.6
 + markdown==3.7
 + markupsafe==3.0.2
 + mergedeep==1.3.4
 + mkdocs==1.6.1
 + mkdocs-get-deps==0.2.0
 + mkdocs-glightbox==0.4.0
 + mkdocs-material==9.6.9
 + mkdocs-material-extensions==1.3.1
 + mkdocs-monorepo-plugin==1.1.0
 + mkdocs-table-reader-plugin==3.1.0
 + numpy==2.2.4
 + packaging==24.2
 + paginate==0.5.7
 + pandas==2.2.3
 + pathspec==0.12.1
 + platformdirs==4.3.6
 + pygments==2.19.1
 + pymdown-extensions==10.14.3
 + python-dateutil==2.9.0.post0
 + python-slugify==8.0.4
 + pytz==2025.1
 + pyyaml==6.0.2
 + pyyaml-env-tag==0.1
 + requests==2.32.3
 + six==1.17.0
 + tabulate==0.9.0
 + text-unidecode==1.3
 + tzdata==2025.1
 + urllib3==2.3.0
 + watchdog==6.0.0
```

### mkdocsプロジェクトを作成

```bash
$ uv run mkdocs new .
INFO    -  Writing config file: ./mkdocs.yml
INFO    -  Writing initial docs: ./docs/index.md

$ mv docs projects
```

### mkdocsのローカルサーバーを起動

`mkdocs.yml`に最低限の設定を記述する。

```md
## Project information
site_name: WebMTG System Documentation
site_dir: build/projects/
docs_dir: projects

## Configuration
theme:
  name: material
  # custom_dir: overrides
  language: "ja"
```

ローカルサーバーを起動する。
記載のURLにアクセスするとドキュメントが表示される。

```bash
$ uv run mkdocs serve
INFO    -  Building documentation...
INFO    -  Cleaning site directory
INFO    -  Documentation built in 0.22 seconds
INFO    -  [23:27:07] Watching paths for changes: 'projects', 'mkdocs.yml'
INFO    -  [23:27:07] Serving on http://127.0.0.1:8000/
INFO    -  [23:27:11] Browser connected: http://127.0.0.1:8000/
```

8000ポートはバックエンド（FastAPI）で使用するので、8100ポートで起動するように`pyproject.toml`に以下の記述を追加する。

```toml
[tool.rye.scripts]
serve = "mkdocs serve -a 127.0.0.1:8100"
```

これで`pyproject.toml`のあるディレクトリで以下のコマンドを実行すると、ローカルサーバーが起動する。

```bash
$ rye run serve
INFO    -  Building documentation...
INFO    -  Cleaning site directory
INFO    -  Documentation built in 0.20 seconds
INFO    -  [23:47:21] Watching paths for changes: 'projects', 'mkdocs.yml'
INFO    -  [23:47:21] Serving on http://127.0.0.1:8100/
INFO    -  [23:47:25] Browser connected: http://127.0.0.1:8100/
```

## 初期構築（backend）

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

### Alembic

----

#### 環境変数の設定

```bash
echo 'export DATABASE_URL=postgresql://postgres:@192.168.50.194:49156/webmtgdb' >> .bashrc
```

#### 初期化

```bash
$ cd alembic
$ alembic init .
  Creating directory '/home/enjn/dev/webmtg-system/backend/alembic/versions' ...  done
  Generating /home/enjn/dev/webmtg-system/backend/alembic/script.py.mako ...  done
  Generating /home/enjn/dev/webmtg-system/backend/alembic/README ...  done
  Generating /home/enjn/dev/webmtg-system/backend/alembic/env.py ...  done
  Generating /home/enjn/dev/webmtg-system/backend/alembic/alembic.ini ...  done
  Please edit configuration/connection/logging settings in '/home/enjn/dev/webmtg-system/backend/alembic/alembic.ini' before proceeding.

$ tree
.
├── README
├── alembic.ini
├── env.py
├── script.py.mako
└── versions
```

#### 設定ファイル（alembic.ini）の修正

```diff
-sqlalchemy.url = driver://user:pass@localhost/dbname
+sqlalchemy.url = %(DATABASE_URL)s
```

#### 環境ファイル（env.py）の修正

```diff
+import os

# 略

 from alembic import context
+from infrastructure.database.models import Base

 # this is the Alembic Config object, which provides
 # access to the values within the .ini file in use.
 config = context.config
+config.set_main_option("sqlalchemy.url", os.getenv("DATABASE_URL"))

# 略

-target_metadata = None
+target_metadata = Base.metadata
```

#### 疎通確認

```bash
$ alembic current
INFO  [alembic.runtime.migration] Context impl PostgresqlImpl.
INFO  [alembic.runtime.migration] Will assume transactional DDL.
```

### Docker

----

#### 環境変数の設定

```bash
echo 'export JWT_SECRET=nlfPjP7g4Ohvvw8pfyGIWvpWyFlNfNcwaU+Y+I7IRbOrpLeK6/3aS2lU6F5U03FIFWC53Dm5kuDNk/lSlQRXhw==' >> .bashrc
echo 'export JWT_EXPIRES_IN=1' >> .bashrc
```

#### 疎通確認

- Dockerfile
- docker-compose.yml

```bash
docker compose up -d webmtg-backend
```

<http://localhost:8000/docs>
