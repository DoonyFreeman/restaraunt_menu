// ChaiShopper website screens. Composes design-system primitives from the bundle.
const { Navbar, Button, Tag, Card, MenuItemCard, CeremonyCard, Input } = window.ChaiShopperDesignSystem_69d5ad;
const D = window.CHAI;

/* ── Shared bits ─────────────────────────────────────────── */
function Eyebrow({ children }) {
  return <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--accent)' }}>{children}</div>;
}
function SectionHead({ eyebrow, title, sub }) {
  return (
    <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 56px' }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 40, letterSpacing: '-0.02em', margin: '16px 0 0', color: 'var(--text-primary)' }}>{title}</h2>
      {sub && <p style={{ marginTop: 14, fontSize: 17, lineHeight: 1.6, color: 'var(--text-muted)' }}>{sub}</p>}
    </div>
  );
}
const wrap = { maxWidth: 1240, margin: '0 auto', padding: '0 32px' };

function Footer({ go }) {
  return (
    <footer style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-raised)', marginTop: 8 }}>
      <div style={{ ...wrap, padding: '64px 32px 40px', display: 'flex', justifyContent: 'space-between', gap: 48, flexWrap: 'wrap' }}>
        <div style={{ maxWidth: 300 }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 24, letterSpacing: '-0.02em' }}>Chai<span style={{ color: 'var(--accent)', fontWeight: 400 }}>Shopper</span></div>
          <p style={{ marginTop: 14, fontSize: 14, lineHeight: 1.7, color: 'var(--text-faint)' }}>Городская азиатская чайная. Искусство чайной паузы — в центре города.</p>
        </div>
        <div style={{ display: 'flex', gap: 64, flexWrap: 'wrap' }}>
          <FootCol title="Навигация" links={[['Меню','menu'],['Наши точки','locations'],['Церемонии','home'],['Бронирование','reservation']]} go={go} />
          <FootCol title="Точки" links={D.locations.map(l => [l.name.replace('ChaiShopper ',''), 'locations'])} go={go} />
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 16 }}>Соцсети</div>
            {['Telegram','Instagram','VK'].map(s => <div key={s} style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 10 }}>{s}</div>)}
          </div>
        </div>
      </div>
      <div style={{ ...wrap, padding: '0 32px 40px', fontSize: 12, color: 'var(--text-faint)' }}>© 2026 ChaiShopper. Сделано с тишиной.</div>
    </footer>
  );
}
function FootCol({ title, links, go }) {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 16 }}>{title}</div>
      {links.map(([label, dest], i) => (
        <div key={i} onClick={() => go(dest)} style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 10, cursor: 'pointer' }}>{label}</div>
      ))}
    </div>
  );
}

/* ── Home ────────────────────────────────────────────────── */
function HomeScreen({ go }) {
  return (
    <div>
      <section style={{ position: 'relative', minHeight: 'calc(100vh - 76px)', display: 'flex', alignItems: 'center',
        backgroundImage: 'linear-gradient(100deg, rgba(15,14,12,0.97) 0%, rgba(15,14,12,0.84) 40%, rgba(15,14,12,0.45) 72%, rgba(15,14,12,0.7) 100%), url(' + D.photos.teapot + ')',
        backgroundSize: 'cover', backgroundPosition: 'center right' }}>
        <div style={{ ...wrap }}>
          <div style={{ maxWidth: 640 }}>
            <Eyebrow>Чайная церемония в городе</Eyebrow>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 76, lineHeight: 1.05, letterSpacing: '-0.02em', margin: '20px 0 0', color: 'var(--text-primary)' }}>Искусство<br/>чайной паузы</h1>
            <p style={{ marginTop: 24, fontSize: 19, lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: 460 }}>Тёплый свет, пар над чашкой и неспешный ритуал. Место, где время замедляется.</p>
            <div style={{ display: 'flex', gap: 14, marginTop: 36 }}>
              <Button variant="primary" size="lg" onClick={() => go('reservation')}>Забронировать стол</Button>
              <Button variant="secondary" size="lg" onClick={() => go('menu')}>Смотреть меню</Button>
            </div>
          </div>
        </div>
      </section>

      <section style={{ ...wrap, padding: '112px 32px' }}>
        <SectionHead eyebrow="Наши церемонии" title="Ритуалы, которым стоит отдать вечер" sub="Три способа замедлиться — от классического пролива улуна до взбитой маття." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {D.ceremonies.map(c => <CeremonyCard key={c.id} {...c} onBook={() => go('reservation')} />)}
        </div>
      </section>

      <section style={{ ...wrap, padding: '0 32px 112px' }}>
        <SectionHead eyebrow="Популярное меню" title="То, что заказывают чаще всего" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
          {D.menu.filter(m => m.tags.includes('top')).concat(D.menu.filter(m => !m.tags.includes('top'))).slice(0,4).map(m => <MenuItemCard key={m.id} {...m} />)}
        </div>
        <div style={{ textAlign: 'center', marginTop: 44 }}><Button variant="ghost" onClick={() => go('menu')}>Всё меню →</Button></div>
      </section>

      <Footer go={go} />
    </div>
  );
}

window.HomeScreen = HomeScreen;
window.ChaiFooter = Footer;
window.ChaiBits = { Eyebrow, SectionHead, wrap };
