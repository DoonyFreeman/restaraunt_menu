# ChaiShopper — План реализации (с дизайн-системой из Claude Design)

> **Для исполнителя:** Реализация по спринтам, задача за задачей. Шаги — чекбоксы (`- [ ]`).
> Этот план **заменяет** `2026-06-29-chaishopper-implementation.md`: визуальный слой
> теперь существует (экспорт Claude Design в `.claude/design/`), поэтому фокус сместился
> с «верстать UI с нуля» на «интегрировать готовую дизайн-систему + подключить бэкенд».

**Цель:** Сайт сети азиатских чайных ChaiShopper (6–20 точек): меню, карта точек,
чайные церемонии, онлайн-бронирование (тип B — менеджер подтверждает, email гостю).

**Архитектура:** Headless WordPress (CMS + WPGraphQL + ACF Pro) → Next.js (App Router,
TypeScript). Один VPS, Docker Compose. Каркас уже поднят (Sprint 0 закрыт).

**Дизайн:** Готовый экспорт в `.claude/design/` — токены (CSS-переменные), React-компоненты
(inline-стили + токены, `.jsx` + `.d.ts`), полные макеты всех страниц (`ui_kits/website/*.jsx`),
ассеты, бренд-гайдлайны.

---

## Ключевые решения адаптации (приняты)

1. **Компоненты — как есть, `.jsx → .tsx`.** Портируем 1:1: inline-стили + CSS-переменные
   сохраняем, типы берём из `.d.ts`. Нулевой риск расхождений с дизайном, минимум работы.
2. **Tailwind v4 остаётся** (уже в каркасе) — только для редкой layout-склейки страниц;
   компоненты живут на токенах, не на утилитах.
3. **Навигация SPA → Next.** В китах навигация через `go('route', param)`. Заменяем на
   `next/link` + реальные маршруты App Router.
4. **Мок-данные → WPGraphQL.** `ui_kits/website/data.js` (`window.CHAI`) — это контракт
   данных. Доменные типы и GraphQL-запросы повторяют его форму.
5. **Faux-карта → Leaflet.** В ките `/locations` карта нарисована divʼами по `x/y %`.
   Заменяем на Leaflet (тёмные тайлы) + готовый SVG-маркер-чайник из ассетов/кита.
6. **Шрифты — через `next/font`** (уже подключены Noto Serif + Inter в `layout.tsx`).
   В `tokens/fonts.css` CDN-`@import` отключаем, чтобы не грузить шрифты дважды.

---

## Карта данных (контракт из `data.js` → WP)

| Сущность | Поля (из кита) | Источник в WP |
|---|---|---|
| `ceremony` | id, name, durationMin, price, description, image | CPT `ceremony` + ACF |
| `menu item` | id, cat, name, price, tags[veg/spicy/top], description, image | CPT `menu_item` + ACF + таксономия `menu_category` |
| `category` | id, name | таксономия `menu_category` |
| `location` | id, name, slug, address, hours, phone, **lat, lng** | CPT `location` + ACF (в ките `x/y%` → в проде реальные координаты) |
| `reservation` | loc, date, time, guests, name, phone, email | CPT `reservation` (создаётся мутацией) |

---

## Карта файлов (фронт после интеграции)

```
web/
├── app/
│   ├── globals.css                 # @import токенов из ds/ + tailwind
│   ├── layout.tsx                  # шрифты + <Navbar/> + <Footer/>
│   ├── page.tsx                    # / (Home)
│   ├── menu/page.tsx + MenuView.tsx
│   ├── locations/page.tsx + LocationsView.tsx
│   ├── locations/[slug]/page.tsx
│   ├── ceremonies/page.tsx
│   ├── reservation/page.tsx + ReservationFlow.tsx
│   ├── styleguide/page.tsx         # визуальная проверка ds (временная)
│   └── api/reservation/route.ts
├── components/ds/                  # ← порт из .claude/design/components
│   ├── Button.tsx  Input.tsx  Tag.tsx
│   ├── Card.tsx  MenuItemCard.tsx  CeremonyCard.tsx
│   ├── Navbar.tsx  Footer.tsx
│   └── index.ts                    # реэкспорт
├── components/
│   ├── menu/CategoryFilter.tsx  LocationSwitcher.tsx
│   ├── locations/LocationsMap.tsx  LocationList.tsx
│   └── reservation/Stepper.tsx
├── lib/
│   ├── ds-tokens/                  # ← порт из .claude/design/tokens
│   ├── graphql/client.ts  queries.ts
│   ├── types.ts
│   ├── menu-merge.ts (+ .test.ts)
│   └── reservation-schema.ts (+ .test.ts)
└── public/design/                  # ← ассеты (фото, маркер, лого)
```

> `.claude/design/` остаётся источником истины (read-only справочник). В `web/` живут
> рабочие порты. Дизайн обновился → перепортировать изменённые файлы.

---

# Sprint 1 — Дизайн-система в проект

**Результат:** токены и все компоненты дизайн-системы работают в Next.js; страница
`/styleguide` показывает их 1:1 с экспортом. Сборка зелёная.

### Task 1.1: Перенос токенов

**Files:**
- Create: `web/app/ds-tokens/{colors,typography,spacing,effects,base}.css` (копии из `.claude/design/tokens/`)
- Modify: `web/app/globals.css`
- Skip: `fonts.css` (шрифты через `next/font`)

- [ ] **Шаг 1:** Скопировать 5 файлов токенов (без `fonts.css`) из `.claude/design/tokens/` в `web/app/ds-tokens/`.
- [ ] **Шаг 2:** В `typography.css` оставить `--font-serif`/`--font-sans`, но значения завязать на переменные `next/font`:
  `--font-serif: var(--font-noto-serif), 'Times New Roman', serif;` и `--font-sans: var(--font-inter), -apple-system, sans-serif;`.
- [ ] **Шаг 3:** `globals.css` — заменить плейсхолдер-токены из Sprint 0 на импорты:

```css
@import "tailwindcss";
@import "./ds-tokens/colors.css";
@import "./ds-tokens/typography.css";
@import "./ds-tokens/spacing.css";
@import "./ds-tokens/effects.css";
@import "./ds-tokens/base.css";
```

- [ ] **Шаг 4: Проверка** — `npm run build` зелёный; на временной странице `<h1>` рендерится Noto Serif кремовым на тёмном фоне.
- [ ] **Шаг 5: Commit** — `git commit -m "feat(web): port design-system tokens"`

### Task 1.2: Перенос ассетов

**Files:**
- Create: `web/public/design/` ← `photo-teapot-dark.jpg`, `photo-gyoza-dark.jpg`, `marker-teapot.svg`, `mark.svg` из `.claude/design/assets/`

- [ ] **Шаг 1:** Скопировать 4 ассета в `web/public/design/`.
- [ ] **Шаг 2: Проверка** — `ls web/public/design/` показывает 4 файла.
- [ ] **Шаг 3: Commit** — `git commit -m "feat(web): design assets"`

### Task 1.3: Core-компоненты (Button, Input, Tag)

**Files:**
- Create: `web/components/ds/Button.tsx`, `Input.tsx`, `Tag.tsx`

- [ ] **Шаг 1:** Портировать `Button.jsx → Button.tsx`: тело без изменений (inline-стили), типы — из `Button.d.ts` (`ButtonProps`). Заменить `JSX.Element` на `React.ReactElement` (Next 16 / React 19).
- [ ] **Шаг 2:** Так же `Input.tsx` (props: `label, hint, error, ...InputHTMLAttributes`) и `Tag.tsx` (`tone, dot, ...`).
- [ ] **Шаг 3:** Каждый — без `'use client'` пока (чистые, но используют hover-хэндлеры/`useState` в Input → Input помечаем `'use client'`).
- [ ] **Шаг 4: Проверка** — компоненты импортируются, `tsc --noEmit` чистый (`npx tsc --noEmit`).
- [ ] **Шаг 5: Commit** — `git commit -m "feat(ds): Button, Input, Tag"`

### Task 1.4: Card-компоненты (Card, MenuItemCard, CeremonyCard)

**Files:**
- Create: `web/components/ds/Card.tsx`, `MenuItemCard.tsx`, `CeremonyCard.tsx`

- [ ] **Шаг 1:** `Card.tsx` — порт (есть `useState` для hover → `'use client'`). Типы из `Card.d.ts`.
- [ ] **Шаг 2:** `MenuItemCard.tsx` — порт; импорт `Card` и `Tag` из `./`. Типы из `MenuItemCard.d.ts` (`name, description, price, image, tags`).
- [ ] **Шаг 3:** `CeremonyCard.tsx` — порт; импорт `Card` и `Button`. Типы из `CeremonyCard.d.ts` (`name, description, durationMin, price, image, onBook`).
- [ ] **Шаг 4: Проверка** — `tsc --noEmit` чистый.
- [ ] **Шаг 5: Commit** — `git commit -m "feat(ds): Card, MenuItemCard, CeremonyCard"`

### Task 1.5: Navbar + Footer + barrel

**Files:**
- Create: `web/components/ds/Navbar.tsx`, `Footer.tsx`, `index.ts`

- [ ] **Шаг 1:** `Navbar.tsx` — порт из `Navbar.jsx` (со встроенным `Mark`). Ссылки `<a>` → `next/link`. CTA `onCta` → `Link href="/reservation"`. Помечаем `'use client'` (hover-хэндлеры). Активную ссылку определять через `usePathname()`.
- [ ] **Шаг 2:** `Footer.tsx` — извлечь `Footer`/`FootCol` из `home.jsx`, оформить как компонент. Принимает список точек пропсом (или грузит сам — серверный). Ссылки → `next/link`.
- [ ] **Шаг 3:** `index.ts` — реэкспорт всех ds-компонентов.
- [ ] **Шаг 4: Проверка** — `tsc --noEmit` чистый.
- [ ] **Шаг 5: Commit** — `git commit -m "feat(ds): Navbar + Footer"`

### Task 1.6: Styleguide-страница (визуальная приёмка)

**Files:**
- Create: `web/app/styleguide/page.tsx`

- [ ] **Шаг 1:** Собрать на странице все ds-компоненты с мок-пропсами (кнопки всех вариантов/размеров, теги всех тонов, карточки меню/церемоний, инпут).
- [ ] **Шаг 2: Проверка** — `npm run dev`, открыть `/styleguide`, **сверить с экспортом** (`.claude/design/` карточки/киты): золото, шрифты, тени, hover-подъём карточек, focus-ring инпута.
- [ ] **Шаг 3: Commit** — `git commit -m "feat(web): styleguide page"`

---

# Sprint 2 — WordPress: контент-модель и API

**Результат:** в админке создаются Locations / Menu Items / Ceremonies; всё отдаётся
через WPGraphQL; есть сид-данные, совпадающие по форме с `data.js`.

> ACF Pro лицензионный — положить `.zip` в `wordpress/plugins/` до `docker compose up`.

### Task 2.1: Поднять окружение + WPGraphQL

- [ ] **Шаг 1:** `cp .env.example .env`, заполнить пароли/секрет. `docker compose up -d`.
- [ ] **Шаг 2:** Пройти установку WP (`/wp/wp-admin`), активировать тему ChaiShopper Headless.
- [ ] **Шаг 3:** Установить плагины: `docker compose exec wordpress wp plugin install wp-graphql --activate`. ACF Pro + `wpgraphql-acf` — активировать.
- [ ] **Шаг 4: Проверка** — `curl -X POST localhost/graphql -H 'Content-Type: application/json' -d '{"query":"{generalSettings{title}}"}'` → JSON с названием.
- [ ] **Шаг 5: Commit** — `git commit -m "chore(wp): graphql + acf enabled"`

### Task 2.2: Custom Post Types + таксономия

**Files:**
- Create: `wordpress/theme-chaishopper/cpt.php`
- Modify: `functions.php` (`require_once __DIR__.'/cpt.php';`)

- [ ] **Шаг 1:** Зарегистрировать CPT с `show_in_graphql=>true`, graphql-имена:
  `location`(Location/Locations), `menu_item`(MenuItem/MenuItems), `ceremony`(Ceremony/Ceremonies),
  `reservation`(`public=>false`, в GraphQL для записи только).
- [ ] **Шаг 2:** Таксономия `menu_category` для `menu_item` (`show_in_graphql=>true`, hierarchical).
- [ ] **Шаг 3: Проверка** — в админке появились разделы; `{ locations { nodes { id } } }` → `[]`.
- [ ] **Шаг 4: Commit** — `git commit -m "feat(wp): CPTs + menu_category taxonomy"`

### Task 2.3: ACF-поля (Local JSON)

**Files:**
- Create: `wordpress/theme-chaishopper/acf-json/` (включить ACF Local JSON, версионировать)

- [ ] **Шаг 1: Location** — `address`(text), `lat`(number), `lng`(number), `phone`(text), `hours`(text), `photo`(image), `hidden_items`(relationship→menu_item, multi), `local_items`(relationship→menu_item, multi).
- [ ] **Шаг 2: Menu Item** — `price`(number), `description`(textarea), `photo`(image), `tags`(checkbox: veg/spicy/top), `is_active`(true_false, default true).
- [ ] **Шаг 3: Ceremony** — `description`(textarea), `duration_min`(number), `price`(number), `photo`(image), `available_locations`(relationship→location).
- [ ] **Шаг 4:** Все группы `show_in_graphql=>true`; проверить graphql-имена полей.
- [ ] **Шаг 5: Проверка** — создать 1 Location, запросить `locationFields { address lat lng }` → данные.
- [ ] **Шаг 6: Commit** — `git commit -m "feat(wp): ACF fields"`

### Task 2.4: Сид-контент

- [ ] **Шаг 1:** Завести по `data.js`: 5 категорий (Чай/Горячее/Дим-сам/Десерты), 6 menu_item с тегами и ценами, 3 ceremony, 3 location (Покровка/Патрики/Горького — реальные координаты Москвы).
- [ ] **Шаг 2:** В одной точке скрыть 1 позицию (`hidden_items`) + добавить 1 локальную (`local_items`) — для проверки merge.
- [ ] **Шаг 3: Проверка** — GraphQL возвращает все сущности с полями.

---

# Sprint 3 — Слой данных (фронт ↔ WP)

**Результат:** типизированный GraphQL-клиент, запросы под форму `data.js`, логика слияния
меню с тестами.

### Task 3.1: GraphQL-клиент и типы

**Files:**
- Create: `web/lib/graphql/client.ts`, `web/lib/types.ts`

- [ ] **Шаг 1:** `client.ts` — `wpQuery<T>(query, variables?)`: `fetch(process.env.WP_GRAPHQL_INTERNAL, { method:'POST', next:{revalidate:3600} })`, бросает при `json.errors`.
- [ ] **Шаг 2:** `types.ts` — интерфейсы под форму кита: `Ceremony{ id,name,durationMin,price,description,image }`, `MenuItem{ id,cat,name,price,tags,description,image }`, `Category{ id,name }`, `Location{ id,name,slug,address,hours,phone,lat,lng,hiddenItems?,localItems? }`.
- [ ] **Шаг 3: Проверка** — временный серверный компонент дёргает `{ generalSettings{ title } }`, выводит на `/styleguide`; затем убрать.
- [ ] **Шаг 4: Commit** — `git commit -m "feat(web): graphql client + types"`

### Task 3.2: Запросы + мапперы (WP → форма кита)

**Files:**
- Create: `web/lib/graphql/queries.ts`

- [ ] **Шаг 1:** Запросы: `MENU_QUERY` (menuItems+поля+категория, menuCategories), `LOCATIONS_QUERY` (точки+координаты+hidden/local), `LOCATION_BY_SLUG_QUERY`, `CEREMONIES_QUERY`.
- [ ] **Шаг 2:** Мапперы WP-ответа в доменные типы (ACF-обёртки `…Fields` → плоские поля; `photo.url → image: 'url(...)'`).
- [ ] **Шаг 3: Проверка** — в GraphiQL (`/wp/wp-admin`) запросы возвращают сид-данные нужной структуры.
- [ ] **Шаг 4: Commit** — `git commit -m "feat(web): graphql queries + mappers"`

### Task 3.3: Логика слияния меню (TDD)

**Files:**
- Create: `web/lib/menu-merge.ts`, `web/lib/menu-merge.test.ts`
- Modify: `web/package.json` (vitest)

- [ ] **Шаг 1:** `npm i -D vitest`. Добавить `"test": "vitest run"`.
- [ ] **Шаг 2: Падающий тест** `menu-merge.test.ts`:

```ts
import { mergeMenuForLocation } from './menu-merge';
const base = [{ id: '1' }, { id: '2' }, { id: '3' }] as any;

test('скрывает hiddenItems и добавляет localItems', () => {
  const loc = { hiddenItems: ['2'], localItems: [{ id: '99' }] } as any;
  expect(mergeMenuForLocation(base, loc).map((i:any)=>i.id)).toEqual(['1','3','99']);
});
test('без точки возвращает базовое меню', () => {
  expect(mergeMenuForLocation(base, null).map((i:any)=>i.id)).toEqual(['1','2','3']);
});
```

- [ ] **Шаг 3: Запустить — упадёт** (`npm test`). Ожидаем: модуль не найден.
- [ ] **Шаг 4: Реализовать** `mergeMenuForLocation(base, location)`: null → base; иначе filter по `hiddenItems` + concat `localItems`.
- [ ] **Шаг 5: Запустить — пройдёт.**
- [ ] **Шаг 6: Commit** — `git commit -m "feat(web): menu merge + tests"`

---

# Sprint 4 — Страницы: Home + Menu

**Результат:** `/` и `/menu` на реальных данных, из ds-компонентов; Navbar/Footer в layout.

### Task 4.1: Layout с Navbar/Footer

**Files:**
- Modify: `web/app/layout.tsx`

- [ ] **Шаг 1:** Обернуть `{children}` в `<Navbar/>` … `<Footer/>`. Footer грузит точки серверно (`LOCATIONS_QUERY`).
- [ ] **Шаг 2: Проверка** — навбар (sticky, blur) и футер на всех страницах; активная ссылка по `usePathname`.
- [ ] **Шаг 3: Commit** — `git commit -m "feat(web): navbar+footer in layout"`

### Task 4.2: Главная

**Files:**
- Modify: `web/app/page.tsx`; Create: `web/components/SectionHead.tsx`, `Eyebrow.tsx` (из `home.jsx`)

- [ ] **Шаг 1:** Извлечь `Eyebrow`, `SectionHead`, `wrap` из `home.jsx` в компоненты/утиль.
- [ ] **Шаг 2:** `page.tsx` (server) — грузит ceremonies + top-menu. Hero (фон `/design/photo-teapot-dark.jpg`, заголовок «Искусство чайной паузы», 2 CTA → `/reservation`,`/menu`), секция церемоний (3 `CeremonyCard`), секция «Популярное» (4 `MenuItemCard` с тегом top). Порт разметки из `HomeScreen`.
- [ ] **Шаг 3:** CTA церемоний → `Link /reservation`.
- [ ] **Шаг 4: Проверка** — `/` визуально совпадает с китом home, данные из WP.
- [ ] **Шаг 5: Commit** — `git commit -m "feat(web): home page"`

### Task 4.3: Меню

**Files:**
- Create: `web/app/menu/page.tsx`, `web/app/menu/MenuView.tsx`, `web/components/menu/{CategoryFilter,LocationSwitcher}.tsx`

- [ ] **Шаг 1:** `CategoryFilter.tsx` + `LocationSwitcher.tsx` — извлечь sticky-фильтр и dropdown из `MenuScreen` (`'use client'`).
- [ ] **Шаг 2:** `page.tsx` (server) — грузит menu+categories+locations → `MenuView`.
- [ ] **Шаг 3:** `MenuView.tsx` (client) — state категории и точки; `mergeMenuForLocation`; фильтр по `cat`; рендер `CategoryFilter`+`LocationSwitcher`+сетка `MenuItemCard` (порт из `MenuScreen`).
- [ ] **Шаг 4: Проверка** — `/menu`: фильтр работает; смена точки скрывает/добавляет позиции по сиду.
- [ ] **Шаг 5: Commit** — `git commit -m "feat(web): menu page"`

---

# Sprint 5 — Локации и реальная карта (Leaflet)

**Результат:** `/locations` с Leaflet-картой (тёмные тайлы, золотые маркеры-чайники) +
список; `/locations/[slug]` со страницей точки.

### Task 5.1: Leaflet-карта

**Files:**
- Create: `web/components/locations/LocationsMap.tsx`
- Modify: `web/package.json` (leaflet, react-leaflet)

- [ ] **Шаг 1:** `npm i leaflet react-leaflet && npm i -D @types/leaflet`.
- [ ] **Шаг 2:** `LocationsMap.tsx` — `'use client'`, динамический импорт без SSR. Тёмные тайлы CartoDB dark. Кастомный `L.divIcon` с SVG-маркером-чайником (из `LocationsScreen.Marker` / `marker-teapot.svg`), активный — `scale(1.18)` и цвет `--gold-200`. Маркеры из пропсов, popup с названием/адресом/телефоном + кнопка «Подробнее» (`Link`). Проп `selectedId` + `onSelect` для синхронизации со списком.
- [ ] **Шаг 3: Проверка** — маркеры на координатах сида, тёмный стиль, popup открывается.
- [ ] **Шаг 4: Commit** — `git commit -m "feat(web): leaflet map"`

### Task 5.2: Страница /locations

**Files:**
- Create: `web/app/locations/page.tsx`, `web/app/locations/LocationsView.tsx`, `web/components/locations/LocationList.tsx`

- [ ] **Шаг 1:** `LocationList.tsx` — список-карточки точек (порт из левой панели `LocationsScreen`): выбранная подсвечена `--border-gold`, кнопки «Подробнее»/«Забронировать» (`Link`).
- [ ] **Шаг 2:** `page.tsx` (server) грузит точки → `LocationsView`.
- [ ] **Шаг 3:** `LocationsView.tsx` (client) — двухколоночный layout: `LocationList` + `LocationsMap`, общий `selectedId`. Адаптив: на мобиле карта сверху, список снизу.
- [ ] **Шаг 4: Проверка** — клик в списке центрирует/подсвечивает маркер и наоборот.
- [ ] **Шаг 5: Commit** — `git commit -m "feat(web): locations page"`

### Task 5.3: Страница /locations/[slug]

**Files:**
- Create: `web/app/locations/[slug]/page.tsx`

- [ ] **Шаг 1:** `generateStaticParams` из всех slug; грузить точку по slug, иначе `notFound()`.
- [ ] **Шаг 2:** Порт `LocationPageScreen`: hero-фото, info-строка (адрес/часы/телефон), локальное меню (`mergeMenuForLocation`), инлайн-CTA брони (`Link /reservation?loc=<slug>`).
- [ ] **Шаг 3: Проверка** — `/locations/pokrovka` рендерит данные; несуществующий slug → 404.
- [ ] **Шаг 4: Commit** — `git commit -m "feat(web): single location page"`

---

# Sprint 6 — Бронирование (форма ↔ WP ↔ email)

**Результат:** степпер-форма создаёт `reservation` в WP; менеджер меняет статус → email гостю.

### Task 6.1: Мутация createReservation (WP)

**Files:**
- Create: `wordpress/theme-chaishopper/graphql.php`; Modify: `functions.php`

- [ ] **Шаг 1:** `register_graphql_mutation('createReservation', …)` — input: `name, phone, email, locationId, datetime, guests`. Создаёт пост `reservation` статус `new`, валидирует обязательные поля, пишет ACF.
- [ ] **Шаг 2:** Защита: проверять заголовок-секрет `RESERVATION_WP_TOKEN` (форма ходит через серверный Route Handler) + honeypot.
- [ ] **Шаг 3: Проверка** — мутация в GraphiQL создаёт reservation, видна в админке (статус new).
- [ ] **Шаг 4: Commit** — `git commit -m "feat(wp): createReservation mutation"`

### Task 6.2: Email при смене статуса (WP)

**Files:**
- Create: `wordpress/theme-chaishopper/reservation-email.php`; Modify: `functions.php`

- [ ] **Шаг 1:** `register_post_status('confirmed')` и `'rejected'` + контролы в админке.
- [ ] **Шаг 2:** Хук `transition_post_status` для `reservation`: → `confirmed` письмо «бронь подтверждена»; → `rejected` «отклонена». Email из ACF, тон по бренд-гайдлайну (спокойный, «вы», без эмодзи).
- [ ] **Шаг 3:** Dev-SMTP уже есть (MailHog в compose). Указать WP слать через `mailhog:1025`.
- [ ] **Шаг 4: Проверка** — сменить статус в админке → письмо в MailHog (`localhost:8025`).
- [ ] **Шаг 5: Commit** — `git commit -m "feat(wp): reservation status emails"`

### Task 6.3: Валидация + Route Handler (Next, TDD)

**Files:**
- Create: `web/lib/reservation-schema.ts` (+ `.test.ts`), `web/app/api/reservation/route.ts`

- [ ] **Шаг 1: Падающий тест** `reservation-schema.test.ts`: пустое имя → fail; кривой email → fail; валидное → ok; guests вне 1–20 → fail.
- [ ] **Шаг 2: Запустить — упадёт.**
- [ ] **Шаг 3:** `npm i zod`. Реализовать `reservationSchema` (name, phone, email, locationId, datetime, guests 1–20).
- [ ] **Шаг 4: Запустить — пройдёт.**
- [ ] **Шаг 5:** `route.ts` (`POST`) — валидирует тело, вызывает `createReservation` с серверным `RESERVATION_WP_TOKEN`, возвращает `{ok:true}` / 400.
- [ ] **Шаг 6: Проверка** — `curl` валидным телом создаёт reservation; кривое → 400.
- [ ] **Шаг 7: Commit** — `git commit -m "feat(web): reservation api + schema"`

### Task 6.4: Степпер-форма + страница /reservation

**Files:**
- Create: `web/app/reservation/page.tsx`, `web/app/reservation/ReservationFlow.tsx`, `web/components/reservation/Stepper.tsx`

- [ ] **Шаг 1:** `Stepper.tsx` — порт `Stepper` из `reservation.jsx`.
- [ ] **Шаг 2:** `ReservationFlow.tsx` (client) — порт `ReservationScreen` (шаги: точка→дата/время→гости→контакты→успех). Шаг контактов на `Input` из ds. На «Подтвердить» — POST `/api/reservation`; ошибки валидации через `reservationSchema`; экран успеха с текстом из кита. Принимает `?loc=` для предвыбора точки.
- [ ] **Шаг 3:** `page.tsx` — грузит точки → `ReservationFlow`.
- [ ] **Шаг 4: Проверка** — пройти форму → бронь в админке + письмо после подтверждения; предвыбор точки с `/locations/[slug]` работает; невалидные данные блокируют отправку.
- [ ] **Шаг 5: Commit** — `git commit -m "feat(web): reservation flow"`

---

# Sprint 7 — Церемонии, анимации, SEO, деплой

**Результат:** `/ceremonies`, subtle-анимации, SEO, прод-деплой на VPS, бэкапы.

### Task 7.1: Страница /ceremonies

**Files:**
- Create: `web/app/ceremonies/page.tsx`

- [ ] **Шаг 1:** Порт `CeremoniesScreen`: атмосферный hero (фото + scrim + пул-цитата `.cs-quote`), сетка `CeremonyCard` из WP. CTA → `Link /reservation`.
- [ ] **Шаг 2: Проверка** — `/ceremonies` совпадает с китом, данные из WP.
- [ ] **Шаг 3: Commit** — `git commit -m "feat(web): ceremonies page"`

### Task 7.2: Анимации (motion)

**Files:**
- Modify: hero/секции/карточки; `web/package.json` (motion)

- [ ] **Шаг 1:** `npm i motion`. Fade-in/scroll-reveal секций, лёгкий parallax hero (токены `--dur*`, `--ease-out` уже есть). Hover-подъём карточек уже встроен — не дублировать.
- [ ] **Шаг 2:** Уважать `prefers-reduced-motion`.
- [ ] **Шаг 3: Проверка** — плавно, без layout shift.
- [ ] **Шаг 4: Commit** — `git commit -m "feat(web): subtle animations"`

### Task 7.3: SEO

**Files:**
- Modify: каждый `page.tsx` (`generateMetadata`); Create: `web/app/sitemap.ts`, `robots.ts`

- [ ] **Шаг 1:** `generateMetadata` (title/description/OG) на всех страницах; на точках — по данным точки.
- [ ] **Шаг 2:** `sitemap.ts` (все маршруты + slug точек), `robots.ts`.
- [ ] **Шаг 3:** JSON-LD `Restaurant`/`LocalBusiness` на страницах точек (адрес, гео, часы).
- [ ] **Шаг 4: Проверка** — `/sitemap.xml`, `/robots.txt` отдаются; метатеги в `<head>`.
- [ ] **Шаг 5: Commit** — `git commit -m "feat(web): SEO + sitemap"`

### Task 7.4: Прод-деплой + бэкапы

**Files:**
- Create: `docker-compose.prod.yml`; Modify: `nginx/default.conf`

- [ ] **Шаг 1:** Prod-compose: образы без dev-маунтов, `NODE_ENV=production`, `web` через `next start` (standalone), реальный SMTP вместо MailHog.
- [ ] **Шаг 2:** Nginx: домен, gzip/brotli, кеш `/_next/static`. TLS через Certbot.
- [ ] **Шаг 3:** Cron-бэкап MySQL + `wp-content/uploads`.
- [ ] **Шаг 4: E2E smoke:** главная → меню (фильтр+точка) → карта (маркеры) → страница точки → бронь → письмо после подтверждения. Прогнать, зафиксировать. Lighthouse, починить очевидное.
- [ ] **Шаг 5: Commit** — `git commit -m "chore: production deploy + backups"`

---

## Соответствие дизайну и спеку (self-review)

- 6 экранов из экспорта → Sprint 4–7 (Home, Menu, Locations, Location, Reservation, Ceremonies) ✅
- Все ds-компоненты портированы → Sprint 1 ✅
- Токены 1:1 → Sprint 1.1 ✅
- Меню «базовое + локальное» → `mergeMenuForLocation` (3.3), применяется в /menu и /locations/[slug] ✅
- Бронь тип B (менеджер + email) → Sprint 6 ✅
- Faux-карта заменена на Leaflet → Sprint 5.1 ✅
- Бренд-voice (русский, спокойный, без эмодзи) → письма (6.2), копирайт берётся из китов ✅

## Чего НЕ делаем (YAGNI)

- Не тащим `_ds_bundle.js` в рантайм — портируем исходники компонентов (контроль + tree-shaking).
- Не переписываем компоненты на Tailwind — адаптируем как есть (решение №1).
- Онлайн-слотов/автоподтверждения брони нет — это тип C, в скоупе тип B.
