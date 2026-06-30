import { Suspense } from 'react';
import { ReservationFlow } from './ReservationFlow';
import { locations } from '@/lib/seed';

export const metadata = {
  title: 'Бронирование — ChaiShopper',
  description: 'Забронируйте стол в ChaiShopper: выберите точку, дату, время и количество гостей.',
};

export default function ReservationPage() {
  return (
    <Suspense>
      <ReservationFlow locations={locations} />
    </Suspense>
  );
}
