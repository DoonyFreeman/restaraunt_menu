// ChaiShopper — логика слияния меню «базовое + локальное».
//
// Глобальные позиции меню − скрытые точкой + локальные позиции точки.
// Логика чистая, без side-effects — удобно тестировать.

import type { MenuItem, Location } from './types';

/**
 * Сливает глобальное меню с локальными настройками точки.
 *
 * @param globalMenu - все позиции меню из WP (базовое меню)
 * @param location - точка с hiddenItems и localItems
 * @returns отфильтрованное + дополненное меню для точки
 */
export function mergeMenu(globalMenu: MenuItem[], location: Location): MenuItem[] {
  const hidden = new Set(location.hiddenItems);

  // 1. Убираем скрытые позиции
  const filtered = globalMenu.filter((item) => !hidden.has(item.id));

  // 2. Добавляем локальные (дедупликация по id)
  const existingIds = new Set(filtered.map((item) => item.id));
  const locals = location.localItems
    .map((id) => globalMenu.find((item) => item.id === id))
    .filter((item): item is MenuItem => item != null && !existingIds.has(item.id));

  return [...filtered, ...locals];
}

/**
 * Группирует меню по категориям.
 */
export function groupByCategory(items: MenuItem[]): Map<string, MenuItem[]> {
  const map = new Map<string, MenuItem[]>();

  for (const item of items) {
    const cat = item.cat || 'other';
    const arr = map.get(cat) ?? [];
    arr.push(item);
    map.set(cat, arr);
  }

  return map;
}
