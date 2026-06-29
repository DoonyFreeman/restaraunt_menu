<?php
// ChaiShopper headless theme — bootstrap.
// CPT/ACF/GraphQL-резолверы добавляются в Sprint 1+ (cpt.php, graphql.php и т.д.).

// Headless: убираем фронтовый мусор.
add_filter( 'show_admin_bar', '__return_false' );

// CORS для GraphQL-запросов с фронта Next.js.
add_action( 'init', function () {
    add_filter( 'graphql_response_headers_to_send', function ( $headers ) {
        $origin = get_http_origin();
        if ( $origin ) {
            $headers['Access-Control-Allow-Origin']  = $origin;
            $headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
            $headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS';
        }
        return $headers;
    } );
} );
