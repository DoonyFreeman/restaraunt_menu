import { LocationsView } from './LocationsView';
import { fetchLocations } from '@/lib/graphql/queries';
import type { Location } from '@/lib/types';

export const metadata = {
  title: 'Наши точки — ChaiShopper',
  description: 'Чайные ChaiShopper в Москве: адреса, часы работы, как добраться.',
};

export default async function LocationsPage() {
  let locations: Location[] = [];
  try {
    locations = await fetchLocations();
  } catch {
    // GraphQL недоступен
  }

  return <LocationsView locations={locations} />;
}
