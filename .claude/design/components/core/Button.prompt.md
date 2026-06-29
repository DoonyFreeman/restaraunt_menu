Gold call-to-action button — use for the primary action on a screen («Забронировать стол»); `secondary` for an outlined alt action, `ghost` for low-emphasis links.

```jsx
<Button variant="primary" size="lg">Забронировать стол</Button>
<Button variant="secondary">Смотреть меню</Button>
<Button variant="ghost" size="sm">Подробнее</Button>
```

- `variant`: `primary` (gold fill, dark text) · `secondary` (transparent, gold border) · `ghost` (text only)
- `size`: `sm` · `md` · `lg`
- `iconLeft` / `iconRight` accept a node (e.g. a Lucide `<i data-lucide>`). Use `as="a"` + `href` for link CTAs.
- Hover lightens the gold; press nudges down 1px. Keep one primary per view.
