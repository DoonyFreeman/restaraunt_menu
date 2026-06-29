Top site navigation — translucent dark bar with backdrop blur, teapot logo + wordmark on the left, links and the gold CTA on the right.

```jsx
<Navbar
  links={[
    { label: 'Меню', href: '/menu', active: true },
    { label: 'Наши точки', href: '/locations' },
    { label: 'Церемонии', href: '/ceremonies' },
  ]}
  onCta={() => …}
/>
```

- `transparent` removes the blur + border for hero overlays (the bar floats over the photo).
- Sticky by default. Mark the current page with `active: true`.
