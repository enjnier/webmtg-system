FROM python:3.12.2-slim

WORKDIR /app
COPY pyproject.toml uv.lock ./
RUN pip install uv && uv sync
