# webmtg-system > docs

[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)で作成したドキュメントを管理する。

## セットアップの備忘録

初期状態（`docs`ディレクトリだけの状態）からmkdocs-materialが使えるようになるまでの手順を備忘録として残す。

環境構築には [rye](https://github.com/astral-sh/rye) と [uv](https://github.com/astral-sh/uv) を使用している。

```bash
// uvプロジェクトの作成 //
$ uv init docs
Initialized project `docs` at `/home/enjn/dev/webmtg-system/docs`

$ cd docs
$ tree -a
.
├── .python-version
├── README.md
├── main.py
└── pyproject.toml

// main.pyを削除 //
$ rm -fr main.py

$ cat pyproject.toml
[project]
name = "docs"
version = "0.1.0"
description = "Add your description here"
readme = "README.md"
requires-python = ">=3.12.3"
dependencies = []
```

```bash
// 必要なパッケージを追加 //
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

```bash
// mkdocsプロジェクトを作成 //
$ uv run mkdocs new .
INFO    -  Writing config file: ./mkdocs.yml
INFO    -  Writing initial docs: ./docs/index.md

// docsディレクトリをprojectsにリネーム //
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

```bash
$ uv run mkdocs serve
INFO    -  Building documentation...
INFO    -  Cleaning site directory
INFO    -  Documentation built in 0.22 seconds
INFO    -  [23:27:07] Watching paths for changes: 'projects', 'mkdocs.yml'
INFO    -  [23:27:07] Serving on http://127.0.0.1:8000/
INFO    -  [23:27:11] Browser connected: http://127.0.0.1:8000/
```
