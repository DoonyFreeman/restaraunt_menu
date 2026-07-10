#!/bin/bash
# ChaiShopper — обёртка над официальным docker-entrypoint.sh.
# Официальный entrypoint копирует WP-core и генерирует wp-config.php —
# его НЕЛЬЗЯ обходить. Мы лишь добавляем первый прогон setup.sh.

set -euo pipefail

FLAG="/var/www/html/.chai-setup-done"

if [ ! -f "$FLAG" ]; then
    echo "[entrypoint] First run. Provisioning WP + running setup..."
    # Официальный entrypoint разложит core/конфиг и поднимет Apache в фоне.
    docker-entrypoint.sh "$@" &
    APACHE_PID=$!

    # Ждём wp-config.php (его пишет docker-entrypoint при старте)
    until [ -f /var/www/html/wp-config.php ]; do sleep 1; done

    bash /setup/setup.sh
    touch "$FLAG"
    echo "[entrypoint] Setup complete."

    # Остаёмся на фоновом Apache; контейнер живёт, пока жив он.
    wait "$APACHE_PID"
else
    bash /setup/migrate.sh || true
    exec docker-entrypoint.sh "$@"
fi
