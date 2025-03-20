FROM python:3.12-slim

WORKDIR /app

COPY pyproject.toml .
COPY README.md .
COPY mkdocs.yml .

# 必要なパッケージをインストール
RUN pip install --no-cache-dir mkdocs mkdocs-material mkdocs-glightbox mkdocs-table-reader-plugin mkdocs-monorepo-plugin

# コンテンツをコピー
COPY projects/ ./projects/

# 8100ポートを公開
EXPOSE 8100

# MkDocsサーバーを起動
CMD ["mkdocs", "serve", "-a", "0.0.0.0:8100"]
