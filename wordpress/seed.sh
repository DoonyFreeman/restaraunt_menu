#!/bin/bash
# ChaiShopper — Seed data importer.
# Создаёт тестовые данные: locations, menu categories, menu items, ceremonies.

set -euo pipefail

echo "[seed] Importing seed data..."

# ─── Категории меню ──────────────────────────────────────────────
declare -A CATEGORIES=(
    ["tea"]="Чай"
    ["hot"]="Горячее"
    ["dim"]="Дим-сам"
    ["sweet"]="Десерты"
)

for slug in "${!CATEGORIES[@]}"; do
    name="${CATEGORIES[$slug]}"
    wp term create menu_category "$name" --slug="$slug" 2>/dev/null || true
    echo "[seed] Category: $name ($slug)"
done

# ─── Локации ──────────────────────────────────────────────────────

# Покровка
wp post create --post_type=location --post_title="ChaiShopper на Покровке" \
    --post_status=publish --porcelain 2>/dev/null | \
    while read -r id; do
        wp post meta update "$id" address "Покровка, 12, Москва" 2>/dev/null
        wp post meta update "$id" hours "Пн–Вс · 10:00–23:00" 2>/dev/null
        wp post meta update "$id" phone "+7 495 120-44-10" 2>/dev/null
        wp post meta update "$id" latitude "55.7589" 2>/dev/null
        wp post meta update "$id" longitude "37.6368" 2>/dev/null
        echo "[seed] Location: Покровка (ID: $id)"
    done

# Патрики
wp post create --post_type=location --post_title="ChaiShopper на Патриках" \
    --post_status=publish --porcelain 2>/dev/null | \
    while read -r id; do
        wp post meta update "$id" address "Малая Бронная, 24, Москва" 2>/dev/null
        wp post meta update "$id" hours "Пн–Вс · 09:00–24:00" 2>/dev/null
        wp post meta update "$id" phone "+7 495 120-44-12" 2>/dev/null
        wp post meta update "$id" latitude "55.7522" 2>/dev/null
        wp post meta update "$id" longitude "37.6025" 2>/dev/null
        echo "[seed] Location: Патрики (ID: $id)"
    done

# Парк Горького
wp post create --post_type=location --post_title="ChaiShopper в Парке Горького" \
    --post_status=publish --porcelain 2>/dev/null | \
    while read -r id; do
        wp post meta update "$id" address "Крымский Вал, 9, Москва" 2>/dev/null
        wp post meta update "$id" hours "Пн–Вс · 11:00–22:00" 2>/dev/null
        wp post meta update "$id" phone "+7 495 120-44-15" 2>/dev/null
        wp post meta update "$id" latitude "55.7312" 2>/dev/null
        wp post meta update "$id" longitude "37.6015" 2>/dev/null
        echo "[seed] Location: Парк Горького (ID: $id)"
    done

# ─── Позиции меню ────────────────────────────────────────────────

# Tea
wp post create --post_type=menu_item --post_title="Улун с горным мёдом" \
    --post_excerpt="Полуферментированный чай с тёплыми нотами и долгим послевкусием." \
    --post_status=publish --porcelain 2>/dev/null | \
    while read -r id; do
        wp post meta update "$id" price 480 2>/dev/null
        wp post meta update "$id" tags '["veg","top"]' 2>/dev/null
        wp term set menu_item "$id" "tea" --by=slug 2>/dev/null || true
        wp term set menu_category "$id" "tea" --by=slug 2>/dev/null || true
        echo "[seed] Menu: Улун с горным мёдом (ID: $id)"
    done

wp post create --post_type=menu_item --post_title="Маття церемониальная" \
    --post_excerpt="Каменный помол, насыщенный умами и мягкая горчинка." \
    --post_status=publish --porcelain 2>/dev/null | \
    while read -r id; do
        wp post meta update "$id" price 520 2>/dev/null
        wp post meta update "$id" tags '["veg"]' 2>/dev/null
        wp term set menu_category "$id" "tea" --by=slug 2>/dev/null || true
        echo "[seed] Menu: Маття церемониальная (ID: $id)"
    done

# Dim Sum
wp post create --post_type=menu_item --post_title="Хар Гао с креветкой" \
    --post_excerpt="Полупрозрачное тесто, сочная начинка, подача на пару." \
    --post_status=publish --porcelain 2>/dev/null | \
    while read -r id; do
        wp post meta update "$id" price 590 2>/dev/null
        wp post meta update "$id" tags '["top"]' 2>/dev/null
        wp term set menu_category "$id" "dim" --by=slug 2>/dev/null || true
        echo "[seed] Menu: Хар Гао с креветкой (ID: $id)"
    done

wp post create --post_type=menu_item --post_title="Баоцзы с уткой" \
    --post_excerpt="Пышные паровые булочки с томлёной уткой и хойсин." \
    --post_status=publish --porcelain 2>/dev/null | \
    while read -r id; do
        wp post meta update "$id" price 560 2>/dev/null
        wp post meta update "$id" tags '[]' 2>/dev/null
        wp term set menu_category "$id" "dim" --by=slug 2>/dev/null || true
        echo "[seed] Menu: Баоцзы с уткой (ID: $id)"
    done

# Hot
wp post create --post_type=menu_item --post_title="Лапша Дан-Дан" \
    --post_excerpt="Пшеничная лапша, кунжутный соус и сычуаньский перец." \
    --post_status=publish --porcelain 2>/dev/null | \
    while read -r id; do
        wp post meta update "$id" price 640 2>/dev/null
        wp post meta update "$id" tags '["spicy"]' 2>/dev/null
        wp term set menu_category "$id" "hot" --by=slug 2>/dev/null || true
        echo "[seed] Menu: Лапша Дан-Дан (ID: $id)"
    done

# Sweet
wp post create --post_type=menu_item --post_title="Моти с кунжутом" \
    --post_excerpt="Рисовое тесто и чёрный кунжут — мягкий, тягучий десерт." \
    --post_status=publish --porcelain 2>/dev/null | \
    while read -r id; do
        wp post meta update "$id" price 380 2>/dev/null
        wp post meta update "$id" tags '["veg","top"]' 2>/dev/null
        wp term set menu_category "$id" "sweet" --by=slug 2>/dev/null || true
        echo "[seed] Menu: Моти с кунжутом (ID: $id)"
    done

# ─── Церемонии ───────────────────────────────────────────────────

wp post create --post_type=ceremony --post_title="Гунфу Ча" \
    --post_excerpt="Классическая церемония пролива — внимание к каждому настою улуна." \
    --post_status=publish --porcelain 2>/dev/null | \
    while read -r id; do
        wp post meta update "$id" duration_min 60 2>/dev/null
        wp post meta update "$id" price 2400 2>/dev/null
        echo "[seed] Ceremony: Гунфу Ча (ID: $id)"
    done

wp post create --post_type=ceremony --post_title="Тядо · Матча" \
    --post_excerpt="Взбивание маття венчиком тясэн в тишине и неспешности." \
    --post_status=publish --porcelain 2>/dev/null | \
    while read -r id; do
        wp post meta update "$id" duration_min 45 2>/dev/null
        wp post meta update "$id" price 1900 2>/dev/null
        echo "[seed] Ceremony: Тядо · Матча (ID: $id)"
    done

wp post create --post_type=ceremony --post_title="Вечерний Пуэр" \
    --post_excerpt="Глубокий выдержанный чай для медленного завершения дня." \
    --post_status=publish --porcelain 2>/dev/null | \
    while read -r id; do
        wp post meta update "$id" duration_min 75 2>/dev/null
        wp post meta update "$id" price 2800 2>/dev/null
        echo "[seed] Ceremony: Вечерний Пуэр (ID: $id)"
    done

wp post create --post_type=ceremony --post_title="Сэнтя · Зелёный полдень" \
    --post_excerpt="Лёгкий японский зелёный чай и пауза среди дня." \
    --post_status=publish --porcelain 2>/dev/null | \
    while read -r id; do
        wp post meta update "$id" duration_min 40 2>/dev/null
        wp post meta update "$id" price 1600 2>/dev/null
        echo "[seed] Ceremony: Сэнтя (ID: $id)"
    done

wp post create --post_type=ceremony --post_title="Молочный улун" \
    --post_excerpt="Сливочные ноты и мягкое тепло в несколько проливов." \
    --post_status=publish --porcelain 2>/dev/null | \
    while read -r id; do
        wp post meta update "$id" duration_min 50 2>/dev/null
        wp post meta update "$id" price 2100 2>/dev/null
        echo "[seed] Ceremony: Молочный улун (ID: $id)"
    done

wp post create --post_type=ceremony --post_title="Те Гуань Инь" \
    --post_excerpt="Глубокий улун «Железная богиня милосердия»." \
    --post_status=publish --porcelain 2>/dev/null | \
    while read -r id; do
        wp post meta update "$id" duration_min 65 2>/dev/null
        wp post meta update "$id" price 2600 2>/dev/null
        echo "[seed] Ceremony: Те Гуань Инь (ID: $id)"
    done

echo "[seed] Seed data imported successfully."
echo "[seed] Locations: 3 | Menu items: 6 | Categories: 4 | Ceremonies: 6"
