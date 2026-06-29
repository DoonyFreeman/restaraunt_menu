FROM wordpress:6-php8.3-apache

# wp-cli для установки/активации плагинов и темы
RUN curl -o /usr/local/bin/wp https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar \
    && chmod +x /usr/local/bin/wp

# WPGraphQL ставится при первом старте через wp-cli (см. plan).
# ACF Pro лицензионный — кладётся вручную в wp-content/plugins (volume или COPY).
