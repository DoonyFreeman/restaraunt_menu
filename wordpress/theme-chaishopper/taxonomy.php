<?php
/**
 * ChaiShopper — Taxonomies.
 *
 * menu_category — таксономия для позиций меню.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

add_action( 'init', 'cs_register_taxonomies' );

function cs_register_taxonomies() {

    register_taxonomy( 'menu_category', array( 'menu_item' ), array(
        'labels'            => array(
            'name'          => 'Категории меню',
            'singular_name' => 'Категория меню',
            'add_new_item'  => 'Добавить категорию',
            'edit_item'     => 'Редактировать категорию',
        ),
        'public'            => false,
        'show_ui'           => true,
        'show_in_rest'      => true,
        'show_in_graphql'   => true,
        'graphql_single_name' => 'menuCategory',
        'graphql_plural_name' => 'menuCategories',
        'hierarchical'      => true,
        'rewrite'           => array( 'slug' => 'menu-category' ),
    ) );
}
