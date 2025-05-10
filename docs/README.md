# Documents

[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)で作成したドキュメントを管理するディレクトリ

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

## ローカルサーバーを起動

3通りの起動方法がある。いずれの場合も起動後は <http://127.0.0.1:8100> にアクセスする。

### Command

`webmtg-system/docs`ディレクトリにて起動コマンドを実行する。

```bash
rye run serve
```

### Docker

`webmtg-system`ディレクトリにてコンテナを立ち上げる。

```bash
docker compose up -d webmtg-document
```

### VSCode

実行とデバッグより`Docs: Serve MkDocs`を実行する。
