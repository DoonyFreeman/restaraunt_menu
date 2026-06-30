import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button, Card, MenuItemCard } from '@/components/ds';
import { wrap } from '@/components/site/Section';
import { locations, locationBySlug, menu, photos } from '@/lib/seed';

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const loc = locationBySlug(slug);
  if (!loc) notFound();

  const local = menu.slice(0, 3); // локальное меню (Sprint 3: реальное по точке)
  const info: Array<[string, string]> = [['Адрес', loc.address], ['Часы', loc.hours], ['Телефон', loc.phone]];

  return (
    <div>
      <section
        style={{
          position: 'relative', minHeight: 420, display: 'flex', alignItems: 'flex-end',
          backgroundImage: `url(${photos.teapot})`, backgroundSize: 'cover', backgroundPosition: 'center',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(70% 80% at 70% 20%, rgba(200,169,110,0.10), transparent 60%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'var(--scrim-hero)' }} />
        <div style={{ ...wrap, position: 'relative', padding: '0 32px 56px' }}>
          <Link href="/locations" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', fontSize: 14, display: 'inline-block', marginBottom: 18 }}>← Все точки</Link>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 60, letterSpacing: '-0.02em', margin: 0 }}>{loc.name.replace('ChaiShopper ', '')}</h1>
        </div>
      </section>

      {/* info row */}
      <section style={{ ...wrap, padding: '48px 32px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 40 }}>
          {info.map(([k, v]) => (
            <div key={k}>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 10 }}>{k}</div>
              <div style={{ fontSize: 17, color: 'var(--text-secondary)' }}>{v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* local menu */}
      <section style={{ ...wrap, padding: '64px 32px 0' }}>
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--accent)' }}>Локальное меню</div>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 36, letterSpacing: '-0.02em', margin: '14px 0 32px' }}>Только в этой точке</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {local.map((m) => (
            <MenuItemCard key={m.id} name={m.name} description={m.description} price={m.price} image={m.image} tags={m.tags} />
          ))}
        </div>
      </section>

      {/* inline reservation CTA */}
      <section style={{ ...wrap, padding: '80px 32px 112px' }}>
        <Card hover={false} style={{ background: 'var(--surface-card)', padding: 40, textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 34, letterSpacing: '-0.02em', margin: 0 }}>Забронировать стол</h2>
          <p style={{ marginTop: 12, fontSize: 16, color: 'var(--text-muted)', maxWidth: 420, margin: '12px auto 0' }}>Выберите дату и время — менеджер подтвердит бронь в этой точке.</p>
          <div style={{ marginTop: 24 }}>
            <Button href={`/reservation?loc=${loc.slug}`} variant="primary" size="lg">Забронировать</Button>
          </div>
        </Card>
      </section>
    </div>
  );
}
