# ChaiShopper — План реализации

> **Для исполнителя:** Реализация по спринтам, задача за задачей. Шаги помечены чекбоксами (`- [ ]`). Каждый спринт заканчивается рабочим, проверяемым результатом и коммитом.

**Цель:** Сайт сети азиатских чайных ресторанов ChaiShopper (6–20 точек) с меню, картой точек, чайными церемониями и онлайн-бронированием.

**Архитектура:** Headless WordPress (CMS + WPGraphQL + ACF Pro) как бэк; Next.js (App Router, SSR/ISR) как фронт. Оба на одном VPS через Docker Compose. Бронирование — CPT в WP, менеджер подтверждает в админке, гость получает email.

**Tech Stack:** WordPress 6.x, WPGraphQL, ACF Pro + WPGraphQL for ACF, Next.js 15 (App Router, TypeScript), Tailwind CSS v4, Leaflet, React Hook Form + Zod, Docker Compose, Nginx.

---

## Карта файлов проекта

```
restaraunt_menu/
├── docker-compose.yml              # WP + MySQL + Next.js + Nginx
├── .env.example                    # переменные окружения
├── nginx/
│   └── default.conf                # реверс-прокси: / → Next, /wp → WP
├── wordpress/
│   ├── Dockerfile                  # WP + нужные расширения PHP
│   ├── plugins/                    # WPGraphQL, ACF Pro (mu-plugins)
│   └── theme-chaishopper/          # минимальная headless-тема
│       ├── functions.php           # регистрация CPT, ACF-полей, GraphQL
│       ├── cpt.php                 # Custom Post Types
│       ├── acf-fields.php          # ACF поля (или JSON в acf-json/)
│       ├── graphql.php             # кастомные GraphQL-резолверы (брони)
│       └── reservation-email.php   # письма при смене статуса брони
└── web/                            # Next.js приложение
    ├── package.json
    ├── next.config.ts
    ├── tsconfig.json
    ├── .env.local
    ├── app/
    │   ├── layout.tsx              # root layout, шрифты, навбар, футер
    │   ├── globals.css             # дизайн-токены (CSS-переменные)
    │   ├── page.tsx                # / — главная
    │   ├── menu/page.tsx           # /menu
    │   ├── locations/
    │   │   ├── page.tsx            # /locations — карта + список
    │   │   └── [slug]/page.tsx     # /locations/[slug] — страница точки
    │   ├── ceremonies/page.tsx     # /ceremonies
    │   └── reservation/page.tsx    # /reservation
    ├── components/
    │   ├── layout/Navbar.tsx
    │   ├── layout/Footer.tsx
    │   ├── ui/Button.tsx
    │   ├── ui/Card.tsx
    │   ├── menu/MenuGrid.tsx
    │   ├── menu/MenuCard.tsx
    │   ├── menu/CategoryFilter.tsx
    │   ├── menu/LocationSwitcher.tsx
    │   ├── locations/LocationsMap.tsx   # Leaflet (client-only)
    │   ├── locations/LocationList.tsx
    │   ├── ceremonies/CeremonyCard.tsx
    │   └── reservation/ReservationForm.tsx
    ├── lib/
    │   ├── graphql/client.ts       # fetch-обёртка к WPGraphQL
    │   ├── graphql/queries.ts      # GraphQL-запросы
    │   ├── types.ts                # TS-типы доменных сущностей
    │   └── menu-merge.ts           # логика "базовое + локальное" меню
    └── app/api/reservation/route.ts # Route Handler: приём формы → WP
```

---

# Sprint 0 — Инициализация и каркас

**Результат спринта:** Поднимается `docker-compose up`, открывается WordPress-админка и пустая стартовая страница Next.js, оба за Nginx. Дизайн-токены заданы.

### Task 0.1: Структура репозитория и Docker Compose

**Files:**
- Create: `docker-compose.yml`, `.env.example`, `.gitignore`, `nginx/default.conf`

- [ ] **Шаг 1: `.gitignore`**

```
node_modules/
.next/
.env
.env.local
wordpress/wp-content/uploads/
db-data/
```

- [ ] **Шаг 2: `.env.example`**

```
# MySQL
MYSQL_ROOT_PASSWORD=changeme_root
MYSQL_DATABASE=chaishopper
MYSQL_USER=chai
MYSQL_PASSWORD=changeme
# WordPress
WP_URL=http://localhost/wp
# Next.js
NEXT_PUBLIC_WP_GRAPHQL=http://localhost/wp/graphql
WP_GRAPHQL_INTERNAL=http://wordpress/graphql   # внутри docker-сети
RESERVATION_WP_TOKEN=changeme_shared_secret
```

- [ ] **Шаг 3: `docker-compose.yml`** — сервисы `db` (MySQL 8), `wordpress` (php-fpm), `web` (Next.js), `nginx`. WP и web в одной сети, наружу торчит только nginx (порт 80).

- [ ] **Шаг 4: `nginx/default.conf`** — `location /wp/ { proxy_pass http://wordpress; }`, `location /graphql { proxy_pass http://wordpress; }`, `location / { proxy_pass http://web:3000; }`.

- [ ] **Шаг 5: Проверка** — `docker compose config` (валидирует синтаксис). Ожидаем: вывод собранного конфига без ошибок.

- [ ] **Шаг 6: Commit** — `git add . && git commit -m "chore: docker-compose scaffold (WP + Next + Nginx)"`

### Task 0.2: WordPress-контейнер и headless-тема

**Files:**
- Create: `wordpress/Dockerfile`, `wordpress/theme-chaishopper/style.css`, `wordpress/theme-chaishopper/functions.php`, `wordpress/theme-chaishopper/index.php`

- [ ] **Шаг 1: `Dockerfile`** — от `wordpress:6-php8.3-fpm`, установить wp-cli.

- [ ] **Шаг 2: `style.css`** — заголовок темы (`Theme Name: ChaiShopper Headless`).

- [ ] **Шаг 3: `index.php`** — заглушка (`<?php // headless`), т.к. фронт на Next.

- [ ] **Шаг 4: `functions.php`** — на этом этапе пусто, только CORS-заголовки для GraphQL и `show_admin_bar(false)`.

- [ ] **Шаг 5: Проверка** — `docker compose up -d`, открыть `http://localhost/wp/wp-admin` → мастер установки WP. Активировать тему ChaiShopper Headless.

- [ ] **Шаг 6: Commit** — `git commit -m "feat(wp): headless theme + dockerfile"`

### Task 0.3: Плагины WPGraphQL + ACF

**Files:**
- Modify: `wordpress/Dockerfile` (доустановка плагинов через wp-cli при сборке или volume)

- [ ] **Шаг 1:** Через wp-cli установить и активировать `wp-graphql`. ACF Pro — положить в `wp-content/plugins/` (лицензионный, кладётся вручную), плюс `wpgraphql-acf`.

- [ ] **Шаг 2: Проверка** — `curl -X POST http://localhost/wp/graphql -H "Content-Type: application/json" -d '{"query":"{generalSettings{title}}"}'`. Ожидаем JSON с названием сайта, не 404.

- [ ] **Шаг 3: Commit** — `git commit -m "feat(wp): WPGraphQL + ACF"`

### Task 0.4: Next.js каркас

**Files:**
- Create: `web/` (через `create-next-app`)

- [ ] **Шаг 1:** `cd web && npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"`

- [ ] **Шаг 2:** Прописать `output: 'standalone'` в `next.config.ts` (для docker), создать `web/Dockerfile` (multi-stage build).

- [ ] **Шаг 3: Проверка** — `npm run dev`, открыть `http://localhost:3000`. Ожидаем стартовую страницу Next.

- [ ] **Шаг 4: Commit** — `git commit -m "feat(web): next.js app scaffold"`

### Task 0.5: Дизайн-токены

**Files:**
- Modify: `web/app/globals.css`
- Create: `web/app/fonts.ts`

- [ ] **Шаг 1: `globals.css`** — CSS-переменные дизайн-системы:

```css
:root {
  --bg: #0F0E0C;
  --accent: #C8A96E;
  --text: #F0EBE1;
  --surface: #2A2520;
  --muted: #6B5B4E;
  --radius: 4px;
}
body { background: var(--bg); color: var(--text); }
```

- [ ] **Шаг 2: `fonts.ts`** — подключить `Noto_Serif` (заголовки) и `Inter` (тело) через `next/font/google`, отдать CSS-переменные `--font-serif`, `--font-sans`.

- [ ] **Шаг 3: Проверка** — добавить в `page.tsx` `<h1>` с serif-шрифтом и золотым акцентом, убедиться визуально (`npm run dev`).

- [ ] **Шаг 4: Commit** — `git commit -m "feat(web): design tokens + fonts"`

> ⚠️ **Здесь подключается дизайн от Claude Design.** Когда будет готова дизайн-система из Claude Design — переносим её токены/значения в `globals.css` поверх плейсхолдеров выше.

---

# Sprint 1 — Контент-модель WordPress

**Результат:** В админке WP создаются Locations, Menu Items, Categories, Ceremonies; все поля доступны через GraphQL.

### Task 1.1: Регистрация Custom Post Types

**Files:**
- Create: `wordpress/theme-chaishopper/cpt.php`
- Modify: `functions.php` (require cpt.php)

- [ ] **Шаг 1:** Зарегистрировать CPT с `show_in_graphql => true`, `graphql_single_name`/`graphql_plural_name`:
  - `location` (Locations)
  - `menu_item` (MenuItems)
  - `ceremony` (Ceremonies)
  - `reservation` (Reservations) — `public => false`, в GraphQL не показываем для чтения публично.
- [ ] **Шаг 2:** Зарегистрировать таксономию `menu_category` для `menu_item` (`show_in_graphql => true`).
- [ ] **Шаг 3: Проверка** — в админке появились разделы Locations / Menu Items / Ceremonies. GraphQL-запрос `{ locations { nodes { id title } } }` возвращает `nodes: []`.
- [ ] **Шаг 4: Commit** — `git commit -m "feat(wp): custom post types + taxonomy"`

### Task 1.2: ACF-поля

**Files:**
- Create: `wordpress/theme-chaishopper/acf-json/` (ACF Local JSON, версионируется в git)

- [ ] **Шаг 1: Location** — поля: `address` (text), `lat` (number), `lng` (number), `phone` (text), `hours` (textarea/repeater), `photo` (image), `hidden_items` (relationship → menu_item, мультивыбор), `local_items` (relationship → menu_item).
- [ ] **Шаг 2: Menu Item** — `price` (number), `description` (textarea), `photo` (image), `tags` (checkbox: vegetarian/spicy/top), `is_active` (true/false).
- [ ] **Шаг 3: Ceremony** — `description` (textarea), `duration_min` (number), `price` (number), `photo` (image), `available_locations` (relationship → location).
- [ ] **Шаг 4:** Все группы — `show_in_graphql => true`, проверить имена в GraphQL.
- [ ] **Шаг 5: Проверка** — создать 1 тестовую Location со всеми полями. Запрос `{ locations { nodes { title locationFields { address lat lng } } } }` возвращает данные.
- [ ] **Шаг 6: Commit** — `git commit -m "feat(wp): ACF fields for locations/menu/ceremonies"`

### Task 1.3: Тестовый контент (сид)

- [ ] **Шаг 1:** Завести 3 категории меню, 8 menu_item, 3 ceremony, 3 location (с координатами реальных городов).
- [ ] **Шаг 2:** В одной точке скрыть 1 позицию (`hidden_items`) и добавить 1 локальную (`local_items`) — для проверки логики merge в Sprint 3.
- [ ] **Шаг 3: Проверка** — GraphQL возвращает все сущности с заполненными полями.
- [ ] (контент в БД, не коммитим код)

---

# Sprint 2 — Дизайн-система фронта, layout, навигация

**Результат:** Общий каркас сайта — навбар, футер, базовые UI-компоненты (Button, Card) в фирменном стиле. GraphQL-клиент работает.

### Task 2.1: GraphQL-клиент и типы

**Files:**
- Create: `web/lib/graphql/client.ts`, `web/lib/graphql/queries.ts`, `web/lib/types.ts`

- [ ] **Шаг 1: `client.ts`** — функция `wpQuery<T>(query, variables)`: `fetch` на `WP_GRAPHQL_INTERNAL` (сервер) с `next: { revalidate: 3600 }`. Бросает при `errors`.
- [ ] **Шаг 2: `types.ts`** — TS-интерфейсы `Location`, `MenuItem`, `MenuCategory`, `Ceremony`, `Reservation` (поля из ACF).
- [ ] **Шаг 3: Тест-проверка** — временный серверный компонент дёргает `{ generalSettings { title } }`, выводит на страницу. Ожидаем название сайта из WP. После проверки удалить.
- [ ] **Шаг 4: Commit** — `git commit -m "feat(web): graphql client + domain types"`

### Task 2.2: UI-компоненты Button и Card

**Files:**
- Create: `web/components/ui/Button.tsx`, `web/components/ui/Card.tsx`

- [ ] **Шаг 1: `Button.tsx`** — варианты `primary` (золотой фон, тёмный текст) и `secondary` (прозрачный, золотая обводка), hover-состояния, проп `as` (button/Link).
- [ ] **Шаг 2: `Card.tsx`** — тёмная поверхность (`--surface`), border-radius, hover-подъём (тень).
- [ ] **Шаг 3: Проверка** — отрендерить оба на временной странице, проверить визуально.
- [ ] **Шаг 4: Commit** — `git commit -m "feat(web): Button + Card components"`

### Task 2.3: Navbar и Footer

**Files:**
- Create: `web/components/layout/Navbar.tsx`, `web/components/layout/Footer.tsx`
- Modify: `web/app/layout.tsx`

- [ ] **Шаг 1: `Navbar.tsx`** — полупрозрачный тёмный фон + `backdrop-blur`, лого слева, ссылки (Меню / Наши точки / Церемонии) + CTA «Забронировать» справа. Мобильное бургер-меню.
- [ ] **Шаг 2: `Footer.tsx`** — лого, навигация, соцсети, список адресов точек (из GraphQL).
- [ ] **Шаг 3: `layout.tsx`** — обернуть `{children}` в Navbar + Footer, подключить шрифты.
- [ ] **Шаг 4: Проверка** — навбар и футер видны на всех страницах, мобильное меню открывается.
- [ ] **Шаг 5: Commit** — `git commit -m "feat(web): navbar + footer layout"`

---

# Sprint 3 — Меню

**Результат:** Страница `/menu` с фильтром по категориям и переключателем точки; работает логика «базовое + локальное» меню.

### Task 3.1: GraphQL-запросы меню

**Files:**
- Modify: `web/lib/graphql/queries.ts`

- [ ] **Шаг 1:** Запрос `MENU_QUERY` — все `menuItems` (с категорией, ценой, тегами, фото, `isActive`) + все `menuCategories`.
- [ ] **Шаг 2:** Запрос `LOCATIONS_MENU_QUERY` — точки с `hiddenItems` и `localItems` (id-шники).
- [ ] **Шаг 3: Проверка** — выполнить запросы в GraphiQL (`/wp/wp-admin/admin.php?page=graphiql-ide`), убедиться в структуре ответа.
- [ ] **Шаг 4: Commit** — `git commit -m "feat(web): menu graphql queries"`

### Task 3.2: Логика слияния меню (с тестом)

**Files:**
- Create: `web/lib/menu-merge.ts`, `web/lib/menu-merge.test.ts`

- [ ] **Шаг 1: Написать падающий тест** `menu-merge.test.ts`:

```ts
import { mergeMenuForLocation } from './menu-merge';

const base = [{ id: '1' }, { id: '2' }, { id: '3' }] as any;
const loc = { hiddenItems: ['2'], localItems: [{ id: '99' }] } as any;

test('hides hidden items and appends local items', () => {
  const result = mergeMenuForLocation(base, loc);
  const ids = result.map(i => i.id);
  expect(ids).toEqual(['1', '3', '99']);
});

test('returns base menu when no location selected', () => {
  expect(mergeMenuForLocation(base, null).map(i => i.id)).toEqual(['1','2','3']);
});
```

- [ ] **Шаг 2: Запустить — упадёт** (`npm test` / vitest). Ожидаем: модуль не найден. (Установить vitest, если ещё нет.)
- [ ] **Шаг 3: Реализовать** `mergeMenuForLocation(baseItems, location)`: если `location` null → `baseItems`; иначе отфильтровать по `hiddenItems`, добавить `localItems`.
- [ ] **Шаг 4: Запустить — пройдёт.**
- [ ] **Шаг 5: Commit** — `git commit -m "feat(web): menu merge logic + tests"`

### Task 3.3: Компоненты меню

**Files:**
- Create: `web/components/menu/MenuCard.tsx`, `MenuGrid.tsx`, `CategoryFilter.tsx`, `LocationSwitcher.tsx`

- [ ] **Шаг 1: `MenuCard.tsx`** — фото / название / описание / цена / бейджи тегов (vegetarian, spicy, top). Использует `Card`.
- [ ] **Шаг 2: `MenuGrid.tsx`** — сетка 3 колонки (адаптив), маппит позиции в `MenuCard`.
- [ ] **Шаг 3: `CategoryFilter.tsx`** — sticky-полоса категорий (client component, `useState` активной категории).
- [ ] **Шаг 4: `LocationSwitcher.tsx`** — dropdown выбора точки, прокидывает выбранную точку наверх.
- [ ] **Шаг 5: Проверка** — собрать на временной странице с моками, проверить фильтрацию визуально.
- [ ] **Шаг 6: Commit** — `git commit -m "feat(web): menu components"`

### Task 3.4: Страница /menu

**Files:**
- Create: `web/app/menu/page.tsx`
- Create: `web/app/menu/MenuView.tsx` (client wrapper для фильтра/свитчера)

- [ ] **Шаг 1: `page.tsx`** (server) — грузит меню, категории, точки через GraphQL, передаёт в `MenuView`.
- [ ] **Шаг 2: `MenuView.tsx`** (client) — состояние выбранной категории и точки, применяет `mergeMenuForLocation`, фильтрует по категории, рендерит `CategoryFilter` + `LocationSwitcher` + `MenuGrid`.
- [ ] **Шаг 3: Проверка** — `/menu`: фильтр по категориям работает; смена точки скрывает/добавляет позиции согласно сид-данным из Task 1.3.
- [ ] **Шаг 4: Commit** — `git commit -m "feat(web): menu page"`

---

# Sprint 4 — Локации и карта

**Результат:** `/locations` с тёмной картой Leaflet, золотыми маркерами и списком; `/locations/[slug]` со страницей точки.

### Task 4.1: GraphQL-запросы локаций

**Files:**
- Modify: `web/lib/graphql/queries.ts`

- [ ] **Шаг 1:** `ALL_LOCATIONS_QUERY` (для карты/списка: title, slug, address, lat, lng, hours, phone).
- [ ] **Шаг 2:** `LOCATION_BY_SLUG_QUERY` (полная карточка + поля для локального меню).
- [ ] **Шаг 3: Проверка** — запросы в GraphiQL возвращают сид-точки с координатами.
- [ ] **Шаг 4: Commit** — `git commit -m "feat(web): location queries"`

### Task 4.2: Карта Leaflet

**Files:**
- Create: `web/components/locations/LocationsMap.tsx`, `web/components/locations/LocationList.tsx`
- Modify: `web/package.json` (leaflet, react-leaflet)

- [ ] **Шаг 1:** `npm i leaflet react-leaflet` + типы.
- [ ] **Шаг 2: `LocationsMap.tsx`** — `'use client'`, динамический импорт без SSR (`ssr: false`), тёмные тайлы (CartoDB dark), кастомный золотой `divIcon` (SVG чайник). Маркеры из пропсов, popup с названием/адресом.
- [ ] **Шаг 3: `LocationList.tsx`** — список точек, клик → центрирует карту (через общий state или ref).
- [ ] **Шаг 4: Проверка** — маркеры на нужных координатах, popup открывается, тёмный стиль карты.
- [ ] **Шаг 5: Commit** — `git commit -m "feat(web): leaflet locations map"`

### Task 4.3: Страница /locations

**Files:**
- Create: `web/app/locations/page.tsx`, `web/app/locations/LocationsView.tsx`

- [ ] **Шаг 1: `page.tsx`** (server) — грузит все точки, передаёт в `LocationsView`.
- [ ] **Шаг 2: `LocationsView.tsx`** (client) — двухколоночный layout: слева `LocationList`, справа `LocationsMap`; общий state выбранной точки.
- [ ] **Шаг 3: Проверка** — клик по точке в списке центрирует карту; адаптив (на мобиле карта сверху, список снизу).
- [ ] **Шаг 4: Commit** — `git commit -m "feat(web): locations page"`

### Task 4.4: Страница /locations/[slug]

**Files:**
- Create: `web/app/locations/[slug]/page.tsx`

- [ ] **Шаг 1:** `generateStaticParams` из всех slug; `page.tsx` грузит точку по slug.
- [ ] **Шаг 2:** Hero-фото, адрес/часы/телефон, локальное меню (через `mergeMenuForLocation`), плейсхолдер-секция формы брони (форму вставим в Sprint 5).
- [ ] **Шаг 3: Проверка** — `/locations/<slug>` рендерит данные точки; несуществующий slug → `notFound()`.
- [ ] **Шаг 4: Commit** — `git commit -m "feat(web): single location page"`

---

# Sprint 5 — Бронирование

**Результат:** Форма брони создаёт `reservation` в WP; менеджер меняет статус → гость получает email.

### Task 5.1: GraphQL-мутация создания брони (WP)

**Files:**
- Create: `wordpress/theme-chaishopper/graphql.php`
- Modify: `functions.php` (require)

- [ ] **Шаг 1:** Зарегистрировать `register_graphql_mutation('createReservation', ...)` с инпутами: `name`, `phone`, `email`, `locationId`, `datetime`, `guests`. Создаёт пост `reservation` со статусом `new`, валидирует обязательные поля.
- [ ] **Шаг 2:** Защита: проверять заголовок-секрет `RESERVATION_WP_TOKEN` (форма шлёт через серверный Route Handler, не из браузера напрямую) + базовый rate-limit/honeypot.
- [ ] **Шаг 3: Проверка** — мутация в GraphiQL создаёт reservation, видна в админке со статусом «new».
- [ ] **Шаг 4: Commit** — `git commit -m "feat(wp): createReservation mutation"`

### Task 5.2: Email при смене статуса (WP)

**Files:**
- Create: `wordpress/theme-chaishopper/reservation-email.php`
- Modify: `functions.php` (require)

- [ ] **Шаг 1:** Хук `transition_post_status` для `reservation`: при переходе в `confirmed` → письмо гостю «бронь подтверждена»; в `rejected` → «к сожалению, отклонена». Брать email из ACF-поля.
- [ ] **Шаг 2:** Зарегистрировать кастомные статусы поста `confirmed` и `rejected` (через `register_post_status`) + кнопки/селект в админке.
- [ ] **Шаг 3:** SMTP — настроить плагин (напр. WP Mail SMTP) или `wp_mail` через VPS-MTA. В dev — MailHog в docker-compose.
- [ ] **Шаг 4: Проверка** — сменить статус брони в админке → письмо приходит в MailHog (`http://localhost:8025`).
- [ ] **Шаг 5: Commit** — `git commit -m "feat(wp): reservation status emails"`

### Task 5.3: Route Handler приёма формы (Next)

**Files:**
- Create: `web/app/api/reservation/route.ts`
- Create: `web/lib/reservation-schema.ts` (+ тест)

- [ ] **Шаг 1: Написать падающий тест** валидации `reservation-schema.test.ts`: пустое имя → ошибка; некорректный email → ошибка; валидные данные → ок.
- [ ] **Шаг 2: Запустить — упадёт.**
- [ ] **Шаг 3: Реализовать** Zod-схему `reservationSchema` (name, phone, email, locationId, datetime, guests 1–20).
- [ ] **Шаг 4: Запустить — пройдёт.**
- [ ] **Шаг 5: `route.ts`** (`POST`) — валидирует тело схемой, вызывает `createReservation` мутацию с серверным токеном `RESERVATION_WP_TOKEN`, возвращает `{ ok: true }` / ошибки.
- [ ] **Шаг 6: Проверка** — `curl -X POST localhost:3000/api/reservation -d '{...}'` создаёт reservation в WP; невалидное тело → 400.
- [ ] **Шаг 7: Commit** — `git commit -m "feat(web): reservation api route + validation"`

### Task 5.4: Компонент формы и страница /reservation

**Files:**
- Create: `web/components/reservation/ReservationForm.tsx`, `web/app/reservation/page.tsx`
- Modify: `web/app/locations/[slug]/page.tsx` (вставить форму с предвыбранной точкой)

- [ ] **Шаг 1:** `npm i react-hook-form @hookform/resolvers`.
- [ ] **Шаг 2: `ReservationForm.tsx`** (client) — шаги: точка → дата/время (`<input type="datetime-local">`, нативный) → гости → контакты → отправка на `/api/reservation` → экран успеха. RHF + zodResolver (та же схема). Проп `defaultLocationId` для страницы точки.
- [ ] **Шаг 3: `reservation/page.tsx`** — грузит список точек, рендерит форму.
- [ ] **Шаг 4:** Вставить форму в `/locations/[slug]` с предвыбранной точкой.
- [ ] **Шаг 5: Проверка** — заполнить форму на `/reservation` → бронь в админке + письмо после подтверждения; форма на странице точки имеет предвыбранную точку; валидация показывает ошибки.
- [ ] **Шаг 6: Commit** — `git commit -m "feat(web): reservation form + pages"`

---

# Sprint 6 — Церемонии и главная страница

**Результат:** `/ceremonies` и наполненная главная `/`.

### Task 6.1: Страница /ceremonies

**Files:**
- Create: `web/app/ceremonies/page.tsx`, `web/components/ceremonies/CeremonyCard.tsx`
- Modify: `web/lib/graphql/queries.ts`

- [ ] **Шаг 1:** `CEREMONIES_QUERY` (title, description, duration_min, price, photo).
- [ ] **Шаг 2: `CeremonyCard.tsx`** — фото / название / длительность / цена / CTA «Забронировать» → `/reservation`.
- [ ] **Шаг 3: `page.tsx`** — hero + сетка `CeremonyCard`.
- [ ] **Шаг 4: Проверка** — `/ceremonies` рендерит сид-церемонии.
- [ ] **Шаг 5: Commit** — `git commit -m "feat(web): ceremonies page"`

### Task 6.2: Главная страница

**Files:**
- Modify: `web/app/page.tsx`

- [ ] **Шаг 1:** Full-screen hero (фон, заголовок «Искусство чайной паузы», CTA «Забронировать стол»).
- [ ] **Шаг 2:** Секция «Наши церемонии» — 3 `CeremonyCard` (из GraphQL).
- [ ] **Шаг 3:** Секция «Популярное меню» — 3–4 `MenuCard` с тегом `top`.
- [ ] **Шаг 4: Проверка** — главная собрана, ссылки ведут на нужные страницы.
- [ ] **Шаг 5: Commit** — `git commit -m "feat(web): home page"`

---

# Sprint 7 — Полиш, анимации, SEO, деплой

**Результат:** Продакшен-сборка на VPS, анимации, SEO, базовая защита.

### Task 7.1: Анимации (subtle)

**Files:**
- Modify: hero, карточки
- Modify: `web/package.json` (motion)

- [ ] **Шаг 1:** `npm i motion`. Fade-in/scroll-reveal для секций, лёгкий parallax на hero, hover-подъём карточек. (Связка: что анимировать — по дизайну, как — Motion `motion/react`.)
- [ ] **Шаг 2: Проверка** — анимации плавные, не мешают, нет layout shift.
- [ ] **Шаг 3: Commit** — `git commit -m "feat(web): subtle animations"`

### Task 7.2: SEO и метаданные

**Files:**
- Modify: каждый `page.tsx` (`generateMetadata`)
- Create: `web/app/sitemap.ts`, `web/app/robots.ts`

- [ ] **Шаг 1:** `generateMetadata` (title/description/OG) на всех страницах; на страницах точек — по данным точки.
- [ ] **Шаг 2:** `sitemap.ts` (главная, меню, локации + все slug точек, церемонии), `robots.ts`.
- [ ] **Шаг 3:** JSON-LD `Restaurant`/`LocalBusiness` на страницах точек (адрес, гео, часы).
- [ ] **Шаг 4: Проверка** — `/sitemap.xml` и `/robots.txt` отдаются; метатеги в `<head>`.
- [ ] **Шаг 5: Commit** — `git commit -m "feat(web): SEO metadata + sitemap"`

### Task 7.3: Продакшен docker-compose + Nginx + TLS

**Files:**
- Create: `docker-compose.prod.yml`
- Modify: `nginx/default.conf` (домен, gzip, кеш статики)

- [ ] **Шаг 1:** Prod-compose: образы без dev-маунтов, рестарт-полиси, `NODE_ENV=production`, `web` через `next start` (standalone).
- [ ] **Шаг 2:** Nginx: реальный домен, gzip/brotli, кеш для `/_next/static`, проксирование `/wp` и `/graphql`.
- [ ] **Шаг 3:** TLS через Certbot (отдельный сервис или host-nginx).
- [ ] **Шаг 4: Проверка** — на VPS `docker compose -f docker-compose.prod.yml up -d`; сайт по https, админка WP доступна, бронь работает end-to-end.
- [ ] **Шаг 5: Commit** — `git commit -m "chore: production compose + nginx + TLS"`

### Task 7.4: Бэкапы и финальная проверка

- [ ] **Шаг 1:** Cron-бэкап MySQL + `wp-content/uploads` на VPS.
- [ ] **Шаг 2: E2E smoke-чеклист:** главная → меню (фильтр + смена точки) → карта (маркеры) → страница точки → бронь → письмо после подтверждения. Прогнать вручную, зафиксировать результат.
- [ ] **Шаг 3:** Lighthouse прогон (perf/SEO/a11y), починить очевидные провалы.
- [ ] **Шаг 4: Commit** — `git commit -m "chore: backups + final smoke check"`

---

## Соответствие спеку (self-review)

- 6–20 точек, фильтрация по городу → карта + список + переключатель точки (Sprint 4) ✅
- Бронирование тип B (менеджер подтверждает, email гостю) → Sprint 5 ✅
- Меню «базовое + локальное» → `mergeMenuForLocation` (Sprint 3.2) ✅
- Чайные церемонии → CPT + страница (Sprint 1, 6) ✅
- Стиль modern fusion, тёмная тема + золото → токены (Sprint 0.5, заменяются дизайном из Claude Design) ✅
- WordPress headless + Next.js + WPGraphQL + ACF, один VPS → Sprint 0, 7 ✅

## Где встраивается Claude Design

Дизайн-бриф из брейншторма → в Claude Design → результат подключается на двух этапах:
1. **Sprint 0.5** — токены (цвета/шрифты/радиусы) переносятся в `globals.css`.
2. **Sprint 2–6** — по каждому экрану/компоненту сверяем вёрстку с мокапом из Claude Design перед коммитом.
