#!/bin/bash
# ChaiShopper — Custom WordPress entrypoint.
# При первом запуске выполняет setup.sh, при последующих — migrate.sh.

set -euo pipefail

# Копируем тему если её нет в volume
THEME_SRC="/var/www/html/wp-content/themes/chaishopper"
THEME_DST="/var/www/html/wp-content/themes/chaishopper"

# Если volume монтирует пустую папку — копируем тему
if [ ! -f "$THEME_DST/functions.php" ]; then
    echo "[entrypoint] Theme not found in volume. Copying..."
    mkdir -p "$THEME_DST"
    cp -r /var/www/html/wp-content/themes/chaishopper.bak/* "$THEME_DST/" 2>/dev/null || true
fi

# Проверяем第一次 ли запуск
FLAG="/var/www/html/.chai-setup-done"

if [ ! -f "$FLAG" ]; then
    echo "[entrypoint] First run detected. Running setup..."
    # Запускаем Apache в фоне для wp-cli
    apache2-foreground &
    APACHE_PID=$!
    sleep 3
    
    bash /setup/setup.sh
    
    touch "$FLAG"
    echo "[entrypoint] Setup complete."
    
    # Не убиваем Apache — он уже работает
else
    echo "[entrypoint] Subsequent run. Running migrations..."
    bash /setup/migrate.sh 2>/dev/null || true
fi

# Запускаем Apache
exec apache2-foreground
