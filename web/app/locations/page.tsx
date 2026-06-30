import { LocationsView } from './LocationsView';
import { locations } from '@/lib/seed';

export const metadata = {
  title: 'Наши точки — ChaiShopper',
  description: 'Чайные ChaiShopper в Москве: адреса, часы работы, как добраться.',
};

export default function LocationsPage() {
  return <LocationsView locations={locations} />;
}
