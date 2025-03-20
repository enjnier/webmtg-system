FROM python:3.12-slim

WORKDIR /app

# requirements.txtをコピー
COPY requirements.txt .

# 依存関係をインストール
RUN pip install --no-cache-dir -r requirements.txt

# コンテンツをコピー
COPY mkdocs.yml .
COPY projects/ ./projects/

# 8100ポートを公開
EXPOSE 8100

# MkDocsサーバーを起動
CMD ["mkdocs", "serve", "-a", "0.0.0.0:8100"]
