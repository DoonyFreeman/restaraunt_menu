# ChaiShopper

Сайт сети азиатских чайных ресторанов (6–20 точек): меню, карта точек, чайные
церемонии, онлайн-бронирование. **Headless WordPress + Next.js.**

## Архитектура

- **Бэк:** WordPress (CMS) + WPGraphQL + ACF Pro. CPT: `location`, `menu_item`,
  `ceremony`, `reservation`; таксономия `menu_category`.
- **Фронт:** Next.js (App Router, TypeScript, Tailwind v4). SSR/ISR, данные из
  WPGraphQL.
- **Бронирование:** форма → Next Route Handler → GraphQL-мутация `createReservation`
  в WP (статус `new`). Менеджер подтверждает в админке → email гостю.
- **Меню «базовое + локальное»:** глобальные `menu_item`; точка скрывает позиции
  (`hidden_items`) и добавляет локальные (`local_items`). Логика слияния —
  `web/lib/menu-merge.ts`.
- **Деплой:** один VPS, Docker Compose (WP + MySQL + Next + Nginx). Nginx: `/wp` и
  `/graphql` → WordPress, `/` → Next.js.

## Структура

```
web/                      Next.js приложение (фронт)
  app/                    маршруты (App Router)
  components/             UI и доменные компоненты
  lib/                    graphql-клиент, типы, бизнес-логика
wordpress/
  theme-chaishopper/      headless-тема (CPT, ACF, GraphQL-резолверы)
  Dockerfile
docker-compose.yml        dev-окружение
nginx/default.conf        реверс-прокси
docs/superpowers/plans/   план реализации по спринтам
```

## Команды

```bash
# фронт (dev)
cd web && npm run dev          # http://localhost:3000
cd web && npm run build        # прод-сборка (standalone)
cd web && npm run lint

# всё окружение
cp .env.example .env           # заполнить секреты
docker compose up -d           # сайт → http://localhost  | WP → /wp/wp-admin
                               # письма (dev) → http://localhost:8025 (MailHog)
```

## Конвенции

- Дизайн-токены — CSS-переменные в `web/app/globals.css` (`--bg`, `--accent`,
  `--text`, `--surface`, `--muted`). ⚠️ Плейсхолдеры — заменяются дизайн-системой
  из Claude Design.
- Шрифты: Noto Serif (заголовки) + Inter (тело), через `next/font`.
- Бизнес-логику (слияние меню, валидация брони) покрываем тестами (TDD).
- План и порядок работ — `docs/superpowers/plans/2026-06-29-chaishopper-implementation.md`.

## Claude Design

Дизайн генерируется в claude.ai/design по брифу; `/design-sync` запускается
**позже** — когда компоненты собраны (`dist/`), чтобы залить их обратно в Claude
Design. На пустом/несобранном репо `/design-sync` не запускать.
