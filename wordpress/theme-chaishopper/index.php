<?php
// Headless: фронт на Next.js. Прямой заход во фронтенд WP не используется.
wp_redirect( home_url( '/wp-admin/' ) );
exit;
