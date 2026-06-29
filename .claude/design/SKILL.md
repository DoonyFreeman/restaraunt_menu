---
name: chaishopper-design
description: Use this skill to generate well-branded interfaces and assets for ChaiShopper (a network of Asian tea-house restaurants — dark theme, matte gold, serif), either for production or throwaway prototypes/mocks. Contains design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files (tokens, components, ui_kits, guidelines, assets).

ChaiShopper is a city network of Asian tea-house restaurants built around the tea pause. Voice: restrained, meditative, premium — never loud. Visual world: deep warm black + matte oolong gold (`#C8A96E`) + cream type, Noto Serif headings + Inter body, generous whitespace, soft warm shadows, subtle fades.

If creating visual artifacts (slides, mocks, throwaway prototypes), copy the assets you need out of `assets/`, link `styles.css` for the design tokens, and produce static HTML files for the user to view. If working on production code, copy assets and read the rules here to become an expert in designing with this brand.

Key files:
- `styles.css` — global token entry point (link this).
- `tokens/` — colors, typography, spacing, effects, fonts.
- `components/` — Button, Tag, Input, Card, MenuItemCard, CeremonyCard, Navbar (React).
- `ui_kits/website/` — interactive recreation of the public site (home, menu, locations, reservation).
- `assets/` — teapot brand mark + gold map marker.
- Icons: Lucide (CDN) at 1.5–2px stroke. Never emoji.

If the user invokes this skill without other guidance, ask what they want to build, ask a few questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
