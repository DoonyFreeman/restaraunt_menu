// ChaiShopper — логика меню «базовое + локальное».
//
// Все позиции (включая локальные эксклюзивы) живут в WP как menu_item.
// Точка может: скрыть позицию (hiddenItems) и объявить позицию своим
// эксклюзивом (localItems) — эксклюзив виден ТОЛЬКО в своей точке.
// Логика чистая, без side-effects — удобно тестировать.

import type { MenuItem, Location } from './types';

/**
 * Меню конкретной точки.
 *
 * @param globalMenu - все позиции меню из WP
 * @param location - точка (hiddenItems, localItems)
 * @param allLocalIds - id, объявленные эксклюзивами ЛЮБОЙ точкой
 *   (обычно `locations.flatMap(l => l.localItems)`). Без него чужие
 *   эксклюзивы не отличить от базовых позиций — они останутся видимыми.
 */
export function mergeMenu(
  globalMenu: MenuItem[],
  location: Location,
  allLocalIds: Iterable<number> = location.localItems,
): MenuItem[] {
  const hidden = new Set(location.hiddenItems);
  const own = new Set(location.localItems);
  const exclusive = new Set(allLocalIds);

  return globalMenu.filter(
    (item) => !hidden.has(item.id) && (!exclusive.has(item.id) || own.has(item.id)),
  );
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
