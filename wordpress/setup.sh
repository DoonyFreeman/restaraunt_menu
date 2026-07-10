#!/bin/bash
# ChaiShopper — WP-CLI setup script.
# Запускается при первом старте WordPress-контейнера.
# Устанавливает WP, плагины, тему, permalink, seed-данные.

set -euo pipefail

WP_URL="${WP_URL:-http://localhost/wp}"
WP_TITLE="ChaiShopper"
WP_ADMIN_USER="${WP_ADMIN_USER:-admin}"
WP_ADMIN_PASS="${WP_ADMIN_PASS:-admin}"
WP_ADMIN_EMAIL="${WP_ADMIN_EMAIL:-admin@chaishopper.local}"

PLUGINS_DIR="/var/www/html/wp-content/plugins"
THEME_DIR="/var/www/html/wp-content/themes/chaishopper"

# ─── Ждём MySQL ──────────────────────────────────────────────────
# Через PHP mysqli: mysql-клиента в образе нет, wp db check не работает.
echo "[setup] Waiting for MySQL..."
until php -r 'exit(@mysqli_connect(getenv("WORDPRESS_DB_HOST"), getenv("WORDPRESS_DB_USER"), getenv("WORDPRESS_DB_PASSWORD"), getenv("WORDPRESS_DB_NAME")) ? 0 : 1);'; do
    sleep 2
done
echo "[setup] MySQL ready."

# ─── Если WP уже установлен — пропускаем ──────────────────────────
if wp core is-installed --quiet 2>/dev/null; then
    echo "[setup] WordPress already installed. Running migrations only."
    bash /setup/migrate.sh 2>/dev/null || true
    exit 0
fi

echo "[setup] Installing WordPress..."

# ─── Установка WordPress ─────────────────────────────────────────
wp core install \
    --url="$WP_URL" \
    --title="$WP_TITLE" \
    --admin_user="$WP_ADMIN_USER" \
    --admin_password="$WP_ADMIN_PASS" \
    --admin_email="$WP_ADMIN_EMAIL" \
    --skip-email

# ─── Permalink structure ─────────────────────────────────────────
wp rewrite structure '/%postname%/' --hard
wp rewrite flush --hard

# ─── Настройки ────────────────────────────────────────────────────
wp option update blogdescription "Чайные рестораны"
wp option update timezone_string "Europe/Moscow"
wp option update date_format "d.m.Y"
wp option update time_format "H:i"

# ─── Активация темы ──────────────────────────────────────────────
wp theme activate chaishopper

# ─── Плагины ──────────────────────────────────────────────────────

# WPGraphQL — ставим из WordPress.org
if [ ! -d "$PLUGINS_DIR/wp-graphql" ]; then
    echo "[setup] Installing WPGraphQL..."
    wp plugin install wp-graphql --activate
else
    echo "[setup] WPGraphQL found. Activating..."
    wp plugin activate wp-graphql
fi

# ACF Pro — если zip-файл положен в wp-content/plugins/
ACF_ZIP=$(find "$PLUGINS_DIR" -maxdepth 1 -name 'advanced-custom-fields-pro-*.zip' 2>/dev/null | head -1)
if [ -n "$ACF_ZIP" ]; then
    echo "[setup] Installing ACF Pro from $ACF_ZIP..."
    wp plugin install "$ACF_ZIP" --activate
    rm -f "$ACF_ZIP"
elif [ ! -d "$PLUGINS_DIR/advanced-custom-fields-pro" ]; then
    echo "[setup] ACF Pro not found. Installing free ACF as fallback..."
    wp plugin install advanced-custom-fields --activate
else
    echo "[setup] ACF Pro found. Activating..."
    wp plugin activate advanced-custom-fields-pro
fi

# WPGraphQL for ACF — экспонирует ACF-поля (locationFields и т.д.) в схему
if [ ! -d "$PLUGINS_DIR/wpgraphql-acf" ]; then
    echo "[setup] Installing WPGraphQL for ACF..."
    wp plugin install wpgraphql-acf --activate
else
    echo "[setup] WPGraphQL for ACF found. Activating..."
    wp plugin activate wpgraphql-acf
fi

echo "[setup] WordPress installed successfully."
echo "[setup] Admin: $WP_ADMIN_USER / $WP_ADMIN_PASS"
echo "[setup] WP: $WP_URL"
echo "[setup] GraphQL: $WP_URL/graphql"

# ─── Seed-данные ─────────────────────────────────────────────────
# Без подавления stderr: ошибки сида должны быть видны в логе контейнера.
bash /setup/seed.sh || echo "[setup] Seed FAILED — см. лог выше."
