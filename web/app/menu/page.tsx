import { MenuView } from './MenuView';
import { menu, categories, locations } from '@/lib/seed';

export const metadata = {
  title: 'Меню — ChaiShopper',
  description: 'Чай и азиатская кухня ChaiShopper: улуны, дим-сам, горячее, десерты.',
};

export default function MenuPage() {
  return <MenuView menu={menu} categories={categories} locations={locations} />;
}
