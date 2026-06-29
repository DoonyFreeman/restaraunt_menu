# ChaiShopper — Design System

> Городская азиатская чайная с чайными церемониями. Dark theme + matte gold + serif = премиум без пафоса.

ChaiShopper is a city network of Asian tea-house restaurants (6–20 locations) built around the ritual of the tea pause. The brand voice is calm, meditative and premium — but never showy. The visual world borrows from Kyoto tea houses and Japanese onsen ryokan: deep warm black, the matte gold of oolong tea, cream type, steam over a cup, quiet light and natural materials (wood, ceramic, stone).

**Audience:** 25–40, urban, value atmosphere and quality.

**Tone in three words:** restrained · meditative · premium.

---

## Sources

This system was built from the brand brief plus the implementation plan in the attached repo. No production UI existed yet — these designs are the source of truth for the build.

- **GitHub:** `DoonyFreeman/restaraunt_menu` — https://github.com/DoonyFreeman/restaraunt_menu
  (contains `docs/superpowers/plans/2026-06-29-chaishopper-implementation.md` — the sprint plan: headless WordPress + WPGraphQL + ACF backend, Next.js 15 / App Router / Tailwind v4 frontend, Leaflet maps. Explore it to align mocks with the real component map.)
- **Local mount:** `restaraunt_menu/` — same repo, docs only.

The frontend stack the designs target: Next.js (App Router), Tailwind CSS v4, Leaflet (dark tiles), React Hook Form + Zod. Component map in the plan: `Navbar`, `Footer`, `Button`, `Card`, `MenuGrid/MenuCard`, `CategoryFilter`, `LocationSwitcher`, `LocationsMap`, `CeremonyCard`, `ReservationForm`.

---

## Screens (from the brief)

1. **Home `/`** — full-screen hero (dark, cup with steam, "Искусство чайной паузы", CTA «Забронировать стол»), "Наши церемонии" (3 cards), "Популярное меню" (3–4 cards), footer.
2. **Menu `/menu`** — sticky category filter, location switcher dropdown, 3-column dish grid (photo / name / description / price / tag).
3. **Locations `/locations`** — left list of points, right dark Leaflet map with gold teapot markers; click → popup card.
4. **Location `/locations/[slug]`** — hero photo, address/hours/phone, local menu, inline reservation form.
5. **Reservation `/reservation`** — centered card, stepped flow: location → date/time → guests → contacts → success.
6. **Ceremonies `/ceremonies`** — atmospheric hero, grid of ceremonies (photo / name / duration / price / CTA).

---

## Index / manifest

- `styles.css` — global entry point (consumers link this). `@import`s only.
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `effects.css`, `fonts.css`, `base.css`.
- `guidelines/` — foundation specimen cards (Design System tab).
- `components/` — reusable React primitives (Button, Tag, Card, MenuItemCard, Input, Navbar, …).
- `ui_kits/website/` — full-screen recreations of the public site.
- `assets/` — logos, marker SVG, imagery.
- `SKILL.md` — Agent Skill wrapper.

---

## CONTENT FUNDAMENTALS

**Language:** Russian, the formal-but-warm register. Address the guest as **«вы»** implicitly — copy rarely uses pronouns at all, preferring calm noun phrases over commands. The brand speaks *about the experience*, not *at the customer*.

**Tone:** unhurried, sensory, a little poetic — never salesy. Sentences are short and breathe. The headline voice leans on the ritual and the senses (steam, light, silence, slowness) rather than features or deals.

**Casing:** Sentence case everywhere for headings and body. Reserve UPPERCASE only for the tiny tracked **eyebrow** labels (e.g. `ЧАЙНАЯ ЦЕРЕМОНИЯ`). Never shout in body copy.

**Punctuation:** Russian guillemets «…» for quotes. Em-dashes for pauses. No exclamation marks in marketing copy — the calm is the point.

**Numbers:** Prices as `480 ₽` (space before ₽). Durations as `60 мин`. Hours as `Пн–Вс · 10:00–23:00` (en-dash, middot separator).

**Emoji:** never. They break the meditative, premium register.

**Examples — say this:**
- «Искусство чайной паузы»
- «Тишина между глотками — тоже часть чая.»
- «Медленный настой, долгое послевкусие»
- «Забронировать стол» · «Смотреть меню» · «Всё меню →»

**Never say:**
- «СКИДКИ! Успей! 🔥🐉» — loud, discount-driven, emoji
- «Лучший китайский фастфуд в городе» — wrong category, wrong register
- Anything with multiple exclamation marks or ALL-CAPS body text

---

## VISUAL FOUNDATIONS

**Mood:** Kyoto tea houses and Japanese onsen ryokan — restraint, steam over a cup, quiet light, natural materials (wood, ceramic, stone). Premium without pomp. The opposite of a loud red "Chinese restaurant".

**Color:** A dark, warm world. Deep warm black page (`#0F0E0C`), dark-brown clay surfaces (`#2A2520` → elevated `#35302A`), and a single hero accent — **matte oolong gold `#C8A96E`**. Text is warm cream (`#F0EBE1`), stepping down through `#D8D0C2` → muted bark `#9A8A7B`. Status colors are deliberately earthy: jade `#7E9A6E` for vegetarian, terracotta-chili `#C16A4E` for spicy — **never neon**. Gold is precious: one gold CTA per view, gold for accents and active states only.

**Type:** Noto Serif (light, 300–400, tracking `-0.02em`) for all headings and display — large, airy, confident. Inter (400/500/600) for body and UI at `line-height: 1.6`. The signature flourish is **large Noto Serif _italic_** for pull-quotes and atmospheric subheads. Eyebrows are 12px Inter 600, uppercase, `0.22em` tracking, in gold.

**Spacing & layout:** Generous whitespace — sections breathe at 96–128px vertical rhythm. 4px base unit. Max content width ~1240px, centered. Whitespace is a feature, not a gap to fill.

**Backgrounds:** Mostly flat warm-black. Atmospheric depth comes from **soft radial gold glows** (very low opacity, behind hero text) and **scrim gradients** over photography (`--scrim-bottom`, `--scrim-hero`) so cream text always sits on a darkened base. No busy patterns; the faint map grid on `/locations` is the only texture. Photography (when present) is atmospheric — steam, hands, light — never lit product shots; warm-toned, slightly shadowed.

**Corner radii:** restrained. `4px` default (buttons, inputs, chips), `8px` cards, `14px` large media/modals, full pill for tags and filter chips.

**Cards:** dark clay surface, 1px subtle border (`#423B33`), soft warm-black shadow (`0 8px 24px rgba(0,0,0,.45)`). On hover they **lift `-4px`** and the shadow deepens (`0 18px 44px …`) with the border brightening. Menu/ceremony cards lead with a full-bleed photo (no padding at the top), then a 16–24px padded body.

**Shadows:** always warm-black, low-spread, soft — never hard or colored, except the optional faint **gold glow** ring used sparingly on focus/featured elements.

**Borders:** 1px hairlines in `--border-subtle` (`#423B33`); gold hairlines (`rgba(200,169,110,.45)`) mark selection and active states.

**Transparency & blur:** the navbar is the signature — `rgba(15,14,12,.72)` + `backdrop-filter: blur(14px) saturate(1.1)`, with a 1px bottom hairline. Same treatment on the sticky menu filter. Over hero photos the navbar can go fully transparent.

**Motion:** subtle and slow. Fades and gentle reveals (`--ease-out` = `cubic-bezier(.22,1,.36,1)`, `240ms`). Hover = gentle 4px card lift; press = 1px nudge down. A light parallax / radial-glow drift on the hero is welcome. **No bounces, no spins, no infinite loops.** Respect `prefers-reduced-motion`.

**Hover/press states:** primary button lightens gold on hover, nudges down 1px on press; secondary brightens its gold border + text; ghost shifts from muted to gold; nav links fade muted→gold; cards lift.

---

## ICONOGRAPHY

**Brand mark:** a custom **minimal line teapot** with two rising steam strokes — see `assets/mark.svg` (gold line on dark) and the map variant `assets/marker-teapot.svg` (dark teapot inside a gold pin). The mark pairs with the wordmark **Chai**`Shopper` set in Noto Serif Light (gold "Shopper"). ⚠️ *These marks were authored for this system — there were no brand source files in the repo. Replace with the official logo when available.*

**UI icon set:** **[Lucide](https://lucide.dev)** — thin, rounded, single-stroke icons that match the restrained line quality of the teapot mark. Load from CDN:

```html
<script src="https://unpkg.com/lucide@latest"></script>
<i data-lucide="utensils"></i> <script>lucide.createIcons();</script>
```

Use Lucide at `1.5–2px` stroke, sized 18–20px in UI, always in `--text-muted` or `--accent`. Good picks: `utensils`, `leaf` (vegetarian), `flame` (spicy), `map-pin`, `clock`, `phone`, `calendar`, `users`, `chevron-down`. ⚠️ *Lucide is a substitution — no icon set shipped with the brief. Swap if the brand adopts a specific family.*

**Emoji:** never used in product. The only glyphs used as icons are restrained Unicode marks where an icon would be overkill: `▾` (dropdown), `✓` (success/step done), `→` (forward links), `−`/`+` (steppers).

---

## Index / manifest (files)

**Root**
- `styles.css` — global entry (`@import`s only). Link this from any consuming page.
- `readme.md` — this guide.
- `SKILL.md` — Agent Skill wrapper.

**`tokens/`** — `colors.css` · `typography.css` · `spacing.css` · `effects.css` · `fonts.css` · `base.css`

**`assets/`** — `mark.svg` (teapot brand mark) · `marker-teapot.svg` (gold map pin) · `photo-teapot-dark.jpg` & `photo-gyoza-dark.jpg` (atmospheric photography — free Unsplash, downloaded locally; see Photo credits).

**`guidelines/`** — 15 specimen cards (Colors ×3, Type ×4, Spacing ×3, Brand ×2 + Components live in their dirs).

**`components/`**
- `core/` — `Button`, `Tag`, `Input`
- `cards/` — `Card`, `MenuItemCard`, `CeremonyCard`
- `layout/` — `Navbar`

**`ui_kits/website/`** — interactive recreation of the public site: `index.html` (app shell), `home.jsx`, `menu-locations.jsx`, `reservation.jsx`, `data.js`. Covers Home, Menu (filter + location switcher), Locations (list + dark map with gold teapot markers), and the 5-step Reservation flow.

**`templates/`** — `website-page/` — branded page shell (navbar + hero + footer) as a Design Component consumers can copy.

---

## Photo credits

Atmospheric photos are free under the [Unsplash License](https://unsplash.com/license), downloaded into `assets/`:
- `photo-teapot-dark.jpg` — steaming teapot, by Seven Colors (@sevencolors) — used on all hero sections.
- `photo-gyoza-dark.jpg` — gyoza on dark wood, by Mikey Frost (@frostyfilmsandphoto) — used on dim-sum menu cards.

Swap for ChaiShopper's own photography when available — keep the warm, dark, atmospheric register (steam, hands, low light; never bright product shots).
