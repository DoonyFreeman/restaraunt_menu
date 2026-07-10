#!/bin/bash
# ChaiShopper — Seed data importer.
# Создаёт тестовые данные: locations, menu categories, menu items, ceremonies.
# ВАЖНО: значения полей пишем через update_field() (ACF), а не голой post meta —
# иначе ACF/GraphQL не увидят значения (нет ссылки _field → field_key).

set -euo pipefail

echo "[seed] Importing seed data..."

# Идемпотентность: если сид уже был — выходим.
if [ "$(wp post list --post_type=location --format=count)" -gt 0 ]; then
    echo "[seed] Data already present. Skipping."
    exit 0
fi

# ─── Хелперы ─────────────────────────────────────────────────────

# acf_set <post_id> <field_name> <php-выражение значения>
acf_set() {
    wp eval "update_field('$2', $3, $1);"
}

# create_post <post_type> <title> <excerpt> → echo ID
create_post() {
    wp post create --post_type="$1" --post_title="$2" \
        --post_excerpt="$3" --post_status=publish --porcelain
}

# ─── Категории меню ──────────────────────────────────────────────
declare -A CATEGORIES=(
    ["tea"]="Чай"
    ["hot"]="Горячее"
    ["dim"]="Дим-сам"
    ["sweet"]="Десерты"
)

for slug in "${!CATEGORIES[@]}"; do
    wp term create menu_category "${CATEGORIES[$slug]}" --slug="$slug" 2>/dev/null || true
    echo "[seed] Category: ${CATEGORIES[$slug]} ($slug)"
done

# ─── Позиции меню ────────────────────────────────────────────────
# seed_menu_item <title> <excerpt> <price> <php-массив тегов> <cat-slug> → ID
seed_menu_item() {
    local id
    id=$(create_post menu_item "$1" "$2")
    acf_set "$id" price "$3"
    acf_set "$id" tags "$4"
    # --quiet: иначе «Success: Set terms.» уходит в stdout и загрязняет захват id
    wp post term set "$id" menu_category "$5" --by=slug --quiet
    echo "[seed] Menu: $1 (ID: $id)" >&2
    echo "$id"
}

OOLONG=$(seed_menu_item "Улун с горным мёдом" "Полуферментированный чай с тёплыми нотами и долгим послевкусием." 480 "array('veg','top')" tea)
MATCHA=$(seed_menu_item "Маття церемониальная" "Каменный помол, насыщенный умами и мягкая горчинка." 520 "array('veg')" tea)
HARGAO=$(seed_menu_item "Хар Гао с креветкой" "Полупрозрачное тесто, сочная начинка, подача на пару." 590 "array('top')" dim)
BAO=$(seed_menu_item "Баоцзы с уткой" "Пышные паровые булочки с томлёной уткой и хойсин." 560 "array()" dim)
DANDAN=$(seed_menu_item "Лапша Дан-Дан" "Пшеничная лапша, кунжутный соус и сычуаньский перец." 640 "array('spicy')" hot)
MOCHI=$(seed_menu_item "Моти с кунжутом" "Рисовое тесто и чёрный кунжут — мягкий, тягучий десерт." 380 "array('veg','top')" sweet)

# ─── Локации ─────────────────────────────────────────────────────
# seed_location <slug> <title> <address> <hours> <phone> <lat> <lng> → ID
seed_location() {
    local slug="$1"; shift
    local id
    id=$(wp post create --post_type=location --post_title="$1" --post_name="$slug" \
        --post_status=publish --porcelain)
    acf_set "$id" address "'$2'"
    acf_set "$id" hours "'$3'"
    acf_set "$id" phone "'$4'"
    acf_set "$id" latitude "$5"
    acf_set "$id" longitude "$6"
    echo "[seed] Location: $1 (ID: $id)" >&2
    echo "$id"
}

POKROVKA=$(seed_location pokrovka "ChaiShopper на Покровке" "Покровка, 12, Москва" "Пн–Вс · 10:00–23:00" "+7 495 120-44-10" 55.7589 37.6368)
PATRIKI=$(seed_location patriki "ChaiShopper на Патриках" "Малая Бронная, 24, Москва" "Пн–Вс · 09:00–24:00" "+7 495 120-44-12" 55.7522 37.6025)
GORKY=$(seed_location gorky "ChaiShopper в Парке Горького" "Крымский Вал, 9, Москва" "Пн–Вс · 11:00–22:00" "+7 495 120-44-15" 55.7312 37.6015)

# Демо «базовое + локальное»: Моти — эксклюзив Покровки; Патрики скрывают Дан-Дан.
acf_set "$POKROVKA" local_items "array($MOCHI)"
acf_set "$PATRIKI" hidden_items "array($DANDAN)"
echo "[seed] Menu overrides: Моти → только Покровка; Дан-Дан скрыт на Патриках"

# ─── Церемонии ───────────────────────────────────────────────────
# seed_ceremony <title> <excerpt> <duration> <price>
seed_ceremony() {
    local id
    id=$(create_post ceremony "$1" "$2")
    acf_set "$id" duration_min "$3"
    acf_set "$id" price "$4"
    echo "[seed] Ceremony: $1 (ID: $id)" >&2
}

seed_ceremony "Гунфу Ча" "Классическая церемония пролива — внимание к каждому настою улуна." 60 2400
seed_ceremony "Тядо · Матча" "Взбивание маття венчиком тясэн в тишине и неспешности." 45 1900
seed_ceremony "Вечерний Пуэр" "Глубокий выдержанный чай для медленного завершения дня." 75 2800
seed_ceremony "Сэнтя · Зелёный полдень" "Лёгкий японский зелёный чай и пауза среди дня." 40 1600
seed_ceremony "Молочный улун" "Сливочные ноты и мягкое тепло в несколько проливов." 50 2100
seed_ceremony "Те Гуань Инь" "Глубокий улун «Железная богиня милосердия»." 65 2600

echo "[seed] Seed data imported successfully."
echo "[seed] Locations: 3 | Menu items: 6 | Categories: 4 | Ceremonies: 6"
