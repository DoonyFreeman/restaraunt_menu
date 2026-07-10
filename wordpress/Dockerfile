FROM wordpress:6-php8.3-apache

# wp-cli: phar + обёртка с --allow-root (в контейнере всё под root)
RUN curl -o /usr/local/bin/wp-cli.phar https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar \
    && chmod +x /usr/local/bin/wp-cli.phar \
    && printf '#!/bin/sh\nexec php /usr/local/bin/wp-cli.phar --allow-root "$@"\n' > /usr/local/bin/wp \
    && chmod +x /usr/local/bin/wp

# Setup-скрипты
COPY setup.sh migrate.sh seed.sh /setup/
COPY entrypoint.sh /usr/local/bin/custom-entrypoint.sh
RUN chmod +x /setup/*.sh /usr/local/bin/custom-entrypoint.sh

# ACF Pro (опционально): положить zip advanced-custom-fields-pro-*.zip
# в volume wp-plugins — setup.sh подхватит; иначе ставится бесплатный ACF.

ENTRYPOINT ["custom-entrypoint.sh"]
CMD ["apache2-foreground"]
