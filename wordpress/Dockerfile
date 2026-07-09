FROM wordpress:6-php8.3-apache

# wp-cli для установки/активации плагинов и темы
RUN curl -o /usr/local/bin/wp https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar \
    && chmod +x /usr/local/bin/wp \
    && wp --info --allow-root 2>/dev/null || true

# bash для скриптов
RUN apt-get update && apt-get install -y bash && rm -rf /var/lib/apt/lists/*

# Копируем setup-скрипты
COPY setup.sh /setup/setup.sh
COPY migrate.sh /setup/migrate.sh
COPY seed.sh /setup/seed.sh
RUN chmod +x /setup/*.sh

# Копируем entrypoint для первого запуска
COPY entrypoint.sh /usr/local/bin/custom-entrypoint.sh
RUN chmod +x /usr/local/bin/custom-entrypoint.sh

# ACF Pro: кладётся вручную в wp-content/plugins/advanced-custom-fields-pro/
# Или как zip: wp-content/plugins/advanced-custom-fields-pro-6.x.zip

ENTRYPOINT ["custom-entrypoint.sh"]
CMD ["apache2-foreground"]
