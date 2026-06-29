Tea-ceremony card — atmospheric photo with a bottom scrim, duration + price meta, name, and a secondary "Забронировать" CTA.

```jsx
<CeremonyCard
  name="Гунфу Ча"
  description="Классическая церемония пролива — внимание к каждому настою."
  durationMin={60}
  price={2400}
  image="url(/assets/gongfu.jpg)"
  onBook={() => …}
/>
```

- Use on `/ceremonies` and the home "Наши церемонии" row.
- Photos should be atmospheric (steam, hands, light) — not product shots.
