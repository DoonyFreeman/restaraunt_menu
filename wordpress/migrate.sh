#!/bin/bash
# ChaiShopper — Migration script.
# Запускается при перезапуске контейнера (если WP уже установлен).
# Обновляет permalink, рефлашит GraphQL-схему.

set -euo pipefail

echo "[migrate] Running migrations..."

# ─── Пересоздаём rewrite rules ────────────────────────────────────
wp rewrite flush --hard 2>/dev/null || true

# ─── Деактивируем/активируем WPGraphQL (если обновился) ───────────
wp plugin activate wp-graphql 2>/dev/null || true

# ─── Обновляем capabilities ────────────────────────────────────────
wp role list 2>/dev/null | grep -q "graphql_reader" || \
    wp role create graphql_reader "GraphQL Reader" 2>/dev/null || true

echo "[migrate] Done."
