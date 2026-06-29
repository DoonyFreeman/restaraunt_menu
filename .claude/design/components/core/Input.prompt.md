Labeled text input used in the reservation form and contact fields.

```jsx
<Input label="Имя" placeholder="Как вас зовут" />
<Input label="Email" type="email" error="Введите корректный email" />
```

- `label`, `hint`, `error` are optional. `error` turns the border red and replaces the hint.
- Focus shows a soft gold ring. Sits on `--bg-well`.
