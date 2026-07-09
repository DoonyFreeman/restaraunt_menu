import { CeremonyCard } from '@/components/ds';
import { wrap, Eyebrow } from '@/components/site/Section';
import { fetchCeremonies } from '@/lib/graphql/queries';
import type { Ceremony } from '@/lib/types';

const TEAPOT = '/design/photo-teapot-dark.jpg';

export const metadata = {
  title: 'Чайные церемонии — ChaiShopper',
  description: 'Гунфу Ча, маття, пуэр и другие ритуалы ChaiShopper — длительность, цены, бронирование.',
};

export default async function CeremoniesPage() {
  let ceremonies: Ceremony[] = [];
  try {
    ceremonies = await fetchCeremonies();
  } catch {
    // GraphQL недоступен
  }

  return (
    <div>
      <section
        style={{
          position: 'relative', minHeight: 460, display: 'flex', alignItems: 'flex-end',
          backgroundImage: `url(${TEAPOT})`, backgroundSize: 'cover', backgroundPosition: 'center',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(80% 70% at 75% 25%, rgba(200,169,110,0.10), transparent 60%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'var(--scrim-hero)' }} />
        <div style={{ ...wrap, position: 'relative', padding: '0 32px 64px' }}>
          <Eyebrow>Чайные церемонии</Eyebrow>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 64, letterSpacing: '-0.02em', margin: '16px 0 0', maxWidth: 640 }}>Ритуалы, которым стоит отдать вечер</h1>
          <p className="cs-quote" style={{ marginTop: 20, maxWidth: 520 }}>«Тишина между глотками — тоже часть чая.»</p>
        </div>
      </section>

      <section style={{ ...wrap, padding: '80px 32px 112px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {ceremonies.map((c) => (
            <CeremonyCard key={c.id} {...c} bookHref="/reservation" />
          ))}
        </div>
      </section>
    </div>
  );
}
