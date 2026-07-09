<?php
/**
 * ChaiShopper — Custom Post Types.
 *
 * location, menu_item, ceremony, reservation.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

add_action( 'init', 'cs_register_cpts' );

function cs_register_cpts() {

    // ─── Location ────────────────────────────────────────────────
    register_post_type( 'location', array(
        'labels'       => array(
            'name'          => 'Точки',
            'singular_name' => 'Точка',
            'add_new_item'  => 'Добавить точку',
            'edit_item'     => 'Редактировать точку',
        ),
        'public'       => false,
        'show_ui'      => true,
        'show_in_rest' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'location',
        'graphql_plural_name' => 'locations',
        'supports'     => array( 'title', 'editor' ),
        'menu_icon'    => 'dashicons-location',
        'has_archive'  => false,
    ) );

    // ─── Menu Item ───────────────────────────────────────────────
    register_post_type( 'menu_item', array(
        'labels'       => array(
            'name'          => 'Меню',
            'singular_name' => 'Позиция меню',
            'add_new_item'  => 'Добавить позицию',
            'edit_item'     => 'Редактировать позицию',
        ),
        'public'       => false,
        'show_ui'      => true,
        'show_in_rest' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'menuItem',
        'graphql_plural_name' => 'menuItems',
        'supports'     => array( 'title', 'editor', 'thumbnail' ),
        'menu_icon'    => 'dashicons-food',
        'has_archive'  => false,
    ) );

    // ─── Ceremony ────────────────────────────────────────────────
    register_post_type( 'ceremony', array(
        'labels'       => array(
            'name'          => 'Церемонии',
            'singular_name' => 'Церемония',
            'add_new_item'  => 'Добавить церемонию',
            'edit_item'     => 'Редактировать церемонию',
        ),
        'public'       => false,
        'show_ui'      => true,
        'show_in_rest' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'ceremony',
        'graphql_plural_name' => 'ceremonies',
        'supports'     => array( 'title', 'editor', 'thumbnail' ),
        'menu_icon'    => 'dashicons-smartphone',
        'has_archive'  => false,
    ) );

    // ─── Reservation ─────────────────────────────────────────────
    register_post_type( 'reservation', array(
        'labels'       => array(
            'name'          => 'Бронирования',
            'singular_name' => 'Бронирование',
            'add_new_item'  => 'Добавить бронирование',
            'edit_item'     => 'Редактировать бронирование',
        ),
        'public'       => false,
        'show_ui'      => true,
        'show_in_rest' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'reservation',
        'graphql_plural_name' => 'reservations',
        'supports'     => array( 'title' ),
        'menu_icon'    => 'dashicons-calendar-alt',
        'has_archive'  => false,
    ) );
}
