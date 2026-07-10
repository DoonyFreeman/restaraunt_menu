import { Suspense } from 'react';
import { ReservationFlow } from './ReservationFlow';
import { fetchLocations } from '@/lib/graphql/queries';
import type { Location } from '@/lib/types';

export const metadata = {
  title: 'Бронирование — ChaiShopper',
  description: 'Забронировать стол в ChaiShopper: выбор точки, даты и времени.',
};

export default async function ReservationPage() {
  let locations: Location[] = [];
  try {
    locations = await fetchLocations();
  } catch {
    // GraphQL недоступен — форма покажет пустой список точек
  }

  // Suspense обязателен: ReservationFlow использует useSearchParams()
  return (
    <Suspense>
      <ReservationFlow locations={locations} />
    </Suspense>
  );
}
