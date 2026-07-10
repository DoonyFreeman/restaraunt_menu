import { MenuView } from './MenuView';
import { fetchMenuItems, fetchMenuCategories, fetchLocations } from '@/lib/graphql/queries';
import type { MenuItem, Category, Location } from '@/lib/types';

// ISR: страница запекается пустой при docker-build (WP недоступен),
// сегмент-конфиг заставляет Next перегенерировать её в рантайме.
export const revalidate = 60;

export const metadata = {
  title: 'Меню — ChaiShopper',
  description: 'Чай и азиатская кухня ChaiShopper: улуны, дим-сам, горячее, десерты.',
};

export default async function MenuPage() {
  let menu: MenuItem[] = [];
  let categories: Category[] = [];
  let locations: Location[] = [];
  try {
    [menu, categories, locations] = await Promise.all([fetchMenuItems(), fetchMenuCategories(), fetchLocations()]);
  } catch {
    // GraphQL недоступен
  }

  return <MenuView menu={menu} categories={categories} locations={locations} />;
}
