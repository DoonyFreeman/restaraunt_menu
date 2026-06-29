Dish card for the menu grid — photo on top, then name, description, price and attribute tags.

```jsx
<MenuItemCard
  name="Улун с горным мёдом"
  description="Полуферментированный чай с тёплыми нотами и долгим послевкусием."
  price={480}
  image="url(/assets/oolong.jpg)"
  tags={['veg', 'top']}
/>
```

- `tags`: `veg` · `spicy` · `top` (rendered as RU short labels).
- `image` is a CSS background value; omit for a warm clay fallback.
- Inherits the hover lift from `Card`. Lay out in a 3-col grid for `/menu`.
