<?php
/**
 * ChaiShopper — ACF Field Groups.
 *
 * Поля для location, menu_item, ceremony, reservation.
 * Работает с бесплатным ACF (все поля — free-типы).
 *
 * Если ACF не установлен — файл молча пропускается.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! function_exists( 'acf_add_local_field_group' ) ) {
    return;
}

// ─── Location ────────────────────────────────────────────────────
acf_add_local_field_group( array(
    'key'      => 'group_location',
    'show_in_graphql'    => 1,
    'graphql_field_name' => 'locationFields',
    'title'    => 'Данные точки',
    'fields'   => array(
        array(
            'key'   => 'field_loc_address',
            'label' => 'Адрес',
            'name'  => 'address',
            'type'  => 'text',
        ),
        array(
            'key'   => 'field_loc_hours',
            'label' => 'Часы работы',
            'name'  => 'hours',
            'type'  => 'text',
        ),
        array(
            'key'   => 'field_loc_phone',
            'label' => 'Телефон',
            'name'  => 'phone',
            'type'  => 'text',
        ),
        array(
            'key'   => 'field_loc_lat',
            'label' => 'Широта',
            'name'  => 'latitude',
            'type'  => 'number',
            'step'  => '0.000001',
        ),
        array(
            'key'   => 'field_loc_lng',
            'label' => 'Долгота',
            'name'  => 'longitude',
            'type'  => 'number',
            'step'  => '0.000001',
        ),
        array(
            'key'          => 'field_loc_hidden',
            'label'        => 'Скрытые позиции меню',
            'name'         => 'hidden_items',
            'type'         => 'relationship',
            'post_type'    => array( 'menu_item' ),
            'instructions' => 'Глобальные позиции, которые НЕ показываются в этой точке.',
        ),
        array(
            'key'          => 'field_loc_local',
            'label'        => 'Локальные позиции меню',
            'name'         => 'local_items',
            'type'         => 'relationship',
            'post_type'    => array( 'menu_item' ),
            'instructions' => 'Эксклюзивы этой точки: видны только здесь, из общего меню скрываются.',
        ),
    ),
    'location' => array(
        array(
            array(
                'param'    => 'post_type',
                'operator' => '==',
                'value'    => 'location',
            ),
        ),
    ),
    'position' => 'normal',
    'style'    => 'default',
) );

// ─── Menu Item ───────────────────────────────────────────────────
acf_add_local_field_group( array(
    'key'      => 'group_menu_item',
    'show_in_graphql'    => 1,
    'graphql_field_name' => 'dishFields',
    'title'    => 'Данные позиции меню',
    'fields'   => array(
        array(
            'key'   => 'field_mi_price',
            'label' => 'Цена (₽)',
            'name'  => 'price',
            'type'  => 'number',
            'min'   => 0,
        ),
        array(
            'key'   => 'field_mi_tags',
            'label' => 'Теги',
            'name'  => 'tags',
            'type'  => 'select',
            'choices' => array(
                'veg'   => 'Вегетарианское',
                'spicy' => 'Острое',
                'top'   => 'Хит',
            ),
            'multiple' => true,
            'ui'       => 'select',
        ),
    ),
    'location' => array(
        array(
            array(
                'param'    => 'post_type',
                'operator' => '==',
                'value'    => 'menu_item',
            ),
        ),
    ),
    'position' => 'normal',
    'style'    => 'default',
) );

// ─── Ceremony ────────────────────────────────────────────────────
acf_add_local_field_group( array(
    'key'      => 'group_ceremony',
    'show_in_graphql'    => 1,
    'graphql_field_name' => 'ceremonyFields',
    'title'    => 'Данные церемонии',
    'fields'   => array(
        array(
            'key'   => 'field_cer_duration',
            'label' => 'Длительность (мин)',
            'name'  => 'duration_min',
            'type'  => 'number',
            'min'   => 1,
        ),
        array(
            'key'   => 'field_cer_price',
            'label' => 'Цена (₽)',
            'name'  => 'price',
            'type'  => 'number',
            'min'   => 0,
        ),
    ),
    'location' => array(
        array(
            array(
                'param'    => 'post_type',
                'operator' => '==',
                'value'    => 'ceremony',
            ),
        ),
    ),
    'position' => 'normal',
    'style'    => 'default',
) );

// ─── Reservation ─────────────────────────────────────────────────
acf_add_local_field_group( array(
    'key'      => 'group_reservation',
    'show_in_graphql'    => 1,
    'graphql_field_name' => 'reservationFields',
    'title'    => 'Данные бронирования',
    'fields'   => array(
        array(
            'key'       => 'field_res_location',
            'label'     => 'Точка',
            'name'      => 'location',
            'type'      => 'relationship',
            'post_type' => array( 'location' ),
            'max'       => 1,
        ),
        array(
            'key'   => 'field_res_date',
            'label' => 'Дата',
            'name'  => 'date',
            'type'  => 'date_picker',
            'display_format' => 'd.m.Y',
            'return_format'  => 'Y-m-d',
        ),
        array(
            'key'   => 'field_res_time',
            'label' => 'Время',
            'name'  => 'time',
            'type'  => 'time_picker',
            'display_format' => 'H:i',
            'return_format'  => 'H:i',
        ),
        array(
            'key'   => 'field_res_guests',
            'label' => 'Количество гостей',
            'name'  => 'guests',
            'type'  => 'number',
            'min'   => 1,
            'max'   => 20,
        ),
        array(
            'key'   => 'field_res_name',
            'label' => 'Имя гостя',
            'name'  => 'guest_name',
            'type'  => 'text',
        ),
        array(
            'key'   => 'field_res_phone',
            'label' => 'Телефон',
            'name'  => 'guest_phone',
            'type'  => 'text',
        ),
        array(
            'key'   => 'field_res_email',
            'label' => 'Email',
            'name'  => 'guest_email',
            'type'  => 'email',
        ),
        array(
            'key'   => 'field_res_notes',
            'label' => 'Пожелания',
            'name'  => 'notes',
            'type'  => 'textarea',
            'rows'  => 3,
        ),
        array(
            'key'   => 'field_res_status',
            'label' => 'Статус',
            'name'  => 'status',
            'type'  => 'select',
            'choices' => array(
                'new'       => 'Новое',
                'confirmed' => 'Подтверждено',
                'cancelled' => 'Отменено',
            ),
            'default_value' => 'new',
        ),
    ),
    'location' => array(
        array(
            array(
                'param'    => 'post_type',
                'operator' => '==',
                'value'    => 'reservation',
            ),
        ),
    ),
    'position' => 'normal',
    'style'    => 'default',
) );
