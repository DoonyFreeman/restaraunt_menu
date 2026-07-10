// ChaiShopper — Тесты для menu-merge.ts (vitest).

import { describe, it, expect } from 'vitest';
import { mergeMenu, groupByCategory } from '../menu-merge';
import type { MenuItem, Location } from '../types';

// ─── Fixture data ────────────────────────────────────────────────

const globalMenu: MenuItem[] = [
  { id: 1, cat: 'tea', name: 'Улун с мёдом', price: 480, tags: ['veg'], description: '', image: '' },
  { id: 2, cat: 'tea', name: 'Маття', price: 520, tags: ['veg'], description: '', image: '' },
  { id: 3, cat: 'dim', name: 'Хар Гао', price: 590, tags: ['top'], description: '', image: '' },
  { id: 4, cat: 'hot', name: 'Лапша', price: 640, tags: ['spicy'], description: '', image: '' },
  { id: 5, cat: 'dim', name: 'Баоцзы', price: 560, tags: [], description: '', image: '' },
  { id: 6, cat: 'sweet', name: 'Моти', price: 380, tags: ['veg', 'top'], description: '', image: '' },
];

const baseLocation: Location = {
  id: 'loc-1',
  name: 'Точка',
  slug: 'tочка',
  address: '',
  hours: '',
  phone: '',
  latitude: 0,
  longitude: 0,
  hiddenItems: [],
  localItems: [],
};

// ─── Tests ───────────────────────────────────────────────────────

describe('mergeMenu', () => {
  it('возвращает все позиции если нет скрытий и локальных', () => {
    const result = mergeMenu(globalMenu, baseLocation);
    expect(result).toHaveLength(globalMenu.length);
  });

  it('убирает позиции из hiddenItems', () => {
    const loc = { ...baseLocation, hiddenItems: [1, 3] };
    const result = mergeMenu(globalMenu, loc);
    expect(result).toHaveLength(4);
    expect(result.find((m) => m.id === 1)).toBeUndefined();
    expect(result.find((m) => m.id === 3)).toBeUndefined();
  });

  it('добавляет локальные позиции', () => {
    const loc = { ...baseLocation, localItems: [100] };
    // Локальный id 100 не в globalMenu → не добавится ( protect от мусора)
    const result = mergeMenu(globalMenu, loc);
    expect(result).toHaveLength(globalMenu.length);
  });

  it('добавляет локальные позиции которые есть в globalMenu', () => {
    const loc = { ...baseLocation, localItems: [1, 2] };
    const result = mergeMenu(globalMenu, loc);
    // Уже есть id=1 и id=2 → дедупликация, не добавляем повторно
    expect(result).toHaveLength(globalMenu.length);
  });

  it('скрытые + локальные работают вместе', () => {
    const loc = { ...baseLocation, hiddenItems: [1], localItems: [2] };
    const result = mergeMenu(globalMenu, loc);
    // Убрали 1, 2 уже есть → длина = 5
    expect(result).toHaveLength(5);
    expect(result.find((m) => m.id === 1)).toBeUndefined();
  });

  it('не мутирует исходный массив', () => {
    const loc = { ...baseLocation, hiddenItems: [1, 2, 3, 4, 5, 6] };
    const result = mergeMenu(globalMenu, loc);
    expect(globalMenu).toHaveLength(6);
    expect(result).toHaveLength(0);
  });

  it('корректно обрабатывает пустой hiddenItems', () => {
    const loc = { ...baseLocation, hiddenItems: [] };
    const result = mergeMenu(globalMenu, loc);
    expect(result).toHaveLength(globalMenu.length);
  });

  // ─── Эксклюзивы (allLocalIds) ──────────────────────────────────

  it('чужой эксклюзив скрыт: точка без localItems не видит позицию 6', () => {
    const patriki = { ...baseLocation };
    const result = mergeMenu(globalMenu, patriki, [6]);
    expect(result.find((m) => m.id === 6)).toBeUndefined();
    expect(result).toHaveLength(5);
  });

  it('владелец видит свой эксклюзив', () => {
    const pokrovka = { ...baseLocation, localItems: [6] };
    const result = mergeMenu(globalMenu, pokrovka, [6]);
    expect(result.find((m) => m.id === 6)).toBeDefined();
    expect(result).toHaveLength(6);
  });

  it('эксклюзив + скрытие работают вместе', () => {
    // Патрики: скрыли 4, чужой эксклюзив 6 → видят 4 позиции
    const patriki = { ...baseLocation, hiddenItems: [4] };
    const result = mergeMenu(globalMenu, patriki, [6]);
    expect(result.map((m) => m.id).sort()).toEqual([1, 2, 3, 5]);
  });
});

describe('groupByCategory', () => {
  it('группирует по cat', () => {
    const grouped = groupByCategory(globalMenu);
    expect(grouped.get('tea')).toHaveLength(2);
    expect(grouped.get('dim')).toHaveLength(2);
    expect(grouped.get('hot')).toHaveLength(1);
    expect(grouped.get('sweet')).toHaveLength(1);
  });

  it('пустой массив → пустая map', () => {
    const grouped = groupByCategory([]);
    expect(grouped.size).toBe(0);
  });

  it('items без cat попадают в other', () => {
    const items: MenuItem[] = [
      { id: 99, cat: '', name: 'Без категории', price: 0, tags: [], description: '', image: '' },
    ];
    const grouped = groupByCategory(items);
    expect(grouped.get('other')).toHaveLength(1);
  });
});
