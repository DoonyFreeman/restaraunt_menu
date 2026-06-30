import { Button, CeremonyCard, MenuItemCard } from '@/components/ds';
import { wrap, Eyebrow, SectionHead } from '@/components/site/Section';
import { ceremonies, menu, photos } from '@/lib/seed';

export default function Home() {
  const featuredCeremonies = ceremonies.slice(0, 3);
  const popular = menu
    .filter((m) => m.tags.includes('top'))
    .concat(menu.filter((m) => !m.tags.includes('top')))
    .slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section
        style={{
          position: 'relative',
          minHeight: 'calc(100vh - var(--navbar-h))',
          display: 'flex',
          alignItems: 'center',
          backgroundImage:
            `linear-gradient(100deg, rgba(15,14,12,0.97) 0%, rgba(15,14,12,0.84) 40%, rgba(15,14,12,0.45) 72%, rgba(15,14,12,0.7) 100%), url(${photos.teapot})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
        }}
      >
        <div style={wrap}>
          <div style={{ maxWidth: 640 }}>
            <Eyebrow>Чайная церемония в городе</Eyebrow>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 76, lineHeight: 1.05, letterSpacing: '-0.02em', margin: '20px 0 0', color: 'var(--text-primary)' }}>
              Искусство<br />чайной паузы
            </h1>
            <p style={{ marginTop: 24, fontSize: 19, lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: 460 }}>
              Тёплый свет, пар над чашкой и неспешный ритуал. Место, где время замедляется.
            </p>
            <div style={{ display: 'flex', gap: 14, marginTop: 36 }}>
              <Button href="/reservation" variant="primary" size="lg">Забронировать стол</Button>
              <Button href="/menu" variant="secondary" size="lg">Смотреть меню</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Ceremonies */}
      <section style={{ ...wrap, padding: '112px 32px' }}>
        <SectionHead
          eyebrow="Наши церемонии"
          title="Ритуалы, которым стоит отдать вечер"
          sub="Три способа замедлиться — от классического пролива улуна до взбитой маття."
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {featuredCeremonies.map((c) => (
            <CeremonyCard key={c.id} {...c} bookHref="/reservation" />
          ))}
        </div>
      </section>

      {/* Popular menu */}
      <section style={{ ...wrap, padding: '0 32px 112px' }}>
        <SectionHead eyebrow="Популярное меню" title="То, что заказывают чаще всего" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
          {popular.map((m) => (
            <MenuItemCard key={m.id} name={m.name} description={m.description} price={m.price} image={m.image} tags={m.tags} />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 44 }}>
          <Button href="/menu" variant="ghost">Всё меню →</Button>
        </div>
      </section>
    </div>
  );
}
