# webmtg-system > docs

[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)で作成したドキュメントを管理する。

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

### ローカルサーバーを起動

`docs/pyproject.toml`のスクリプトに起動コマンドを登録している。

```bash
[tool.rye.scripts]
serve = "mkdocs serve -a 127.0.0.1:8100"
```

直接コマンドで実行する場合は

```bash
rye run serve
```

もしくは、`launch.json`に登録している構成`Docs: Serve MkDocs`を実行とデバッグから起動する。

## セットアップの備忘録

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
