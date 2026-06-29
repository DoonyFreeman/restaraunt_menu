// ChaiShopper — Ceremonies page & single Location page.
const { Button, Tag, Card, MenuItemCard, CeremonyCard } = window.ChaiShopperDesignSystem_69d5ad;
const Dc2 = window.CHAI;
const { wrap } = window.ChaiBits;
const Footer3 = window.ChaiFooter;

const MORE_CEREMONIES = [
  { id: 'sencha', name: 'Сэнтя · Зелёный полдень', durationMin: 40, price: 1600,
    description: 'Лёгкий японский зелёный чай и пауза среди дня.', image: 'linear-gradient(160deg,#3f4a39,#14130f)' },
  { id: 'milk-oolong', name: 'Молочный улун', durationMin: 50, price: 2100,
    description: 'Сливочные ноты и мягкое тепло в несколько проливов.', image: 'linear-gradient(160deg,#4a4030,#15120d)' },
  { id: 'night-tie', name: 'Те Гуань Инь', durationMin: 65, price: 2600,
    description: 'Глубокий улун «Железная богиня милосердия».', image: 'linear-gradient(160deg,#46372c,#120f0b)' },
];

function CeremoniesScreen({ go }) {
  const all = Dc2.ceremonies.concat(MORE_CEREMONIES);
  return (
    <div>
      {/* atmospheric hero */}
      <section style={{ position: 'relative', minHeight: 460, display: 'flex', alignItems: 'flex-end',
        backgroundImage: 'url(' + Dc2.photos.teapot + ')', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(80% 70% at 75% 25%, rgba(200,169,110,0.10), transparent 60%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'var(--scrim-hero)' }} />
        <div style={{ ...wrap, position: 'relative', padding: '0 32px 64px' }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--accent)' }}>Чайные церемонии</div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 64, letterSpacing: '-0.02em', margin: '16px 0 0', maxWidth: 640 }}>Ритуалы, которым стоит отдать вечер</h1>
          <p className="cs-quote" style={{ marginTop: 20, maxWidth: 520 }}>«Тишина между глотками — тоже часть чая.»</p>
        </div>
      </section>

      <section style={{ ...wrap, padding: '80px 32px 112px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {all.map(c => <CeremonyCard key={c.id} {...c} onBook={() => go('reservation')} />)}
        </div>
      </section>
      <Footer3 go={go} />
    </div>
  );
}

function LocationPageScreen({ go, param }) {
  const loc = param || Dc2.locations[0];
  const local = Dc2.menu.slice(0, 3); // local menu subset
  const info = [['Адрес', loc.address], ['Часы', loc.hours], ['Телефон', loc.phone]];
  return (
    <div>
      <section style={{ position: 'relative', minHeight: 420, display: 'flex', alignItems: 'flex-end',
        backgroundImage: 'url(' + Dc2.photos.teapot + ')', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(70% 80% at 70% 20%, rgba(200,169,110,0.10), transparent 60%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'var(--scrim-hero)' }} />
        <div style={{ ...wrap, position: 'relative', padding: '0 32px 56px' }}>
          <button onClick={() => go('locations')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', fontSize: 14, cursor: 'pointer', padding: 0, marginBottom: 18 }}>← Все точки</button>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 60, letterSpacing: '-0.02em', margin: 0 }}>{loc.name.replace('ChaiShopper ','')}</h1>
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
          {local.map(m => <MenuItemCard key={m.id} {...m} />)}
        </div>
      </section>

      {/* inline reservation CTA */}
      <section style={{ ...wrap, padding: '80px 32px 112px' }}>
        <Card hover={false} style={{ background: 'var(--surface-card)', padding: 40, textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 34, letterSpacing: '-0.02em', margin: 0 }}>Забронировать стол</h2>
          <p style={{ marginTop: 12, fontSize: 16, color: 'var(--text-muted)', maxWidth: 420, margin: '12px auto 0' }}>Выберите дату и время — менеджер подтвердит бронь в этой точке.</p>
          <div style={{ marginTop: 24 }}><Button variant="primary" size="lg" onClick={() => go('reservation')}>Забронировать</Button></div>
        </Card>
      </section>
      <Footer3 go={go} />
    </div>
  );
}

window.CeremoniesScreen = CeremoniesScreen;
window.LocationPageScreen = LocationPageScreen;
