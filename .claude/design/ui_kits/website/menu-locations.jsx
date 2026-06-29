// ChaiShopper — Menu & Locations screens.
const { Button, Tag, Card, MenuItemCard } = window.ChaiShopperDesignSystem_69d5ad;
const Dm = window.CHAI;
const { wrap } = window.ChaiBits;
const Footer2 = window.ChaiFooter;

/* ── Menu ────────────────────────────────────────────────── */
function MenuScreen({ go }) {
  const [cat, setCat] = React.useState('all');
  const [loc, setLoc] = React.useState(Dm.locations[0]);
  const [open, setOpen] = React.useState(false);
  const items = cat === 'all' ? Dm.menu : Dm.menu.filter(m => m.cat === cat);

  return (
    <div>
      <div style={{ ...wrap, padding: '56px 32px 0' }}>
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--accent)' }}>Меню</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap', marginTop: 14 }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 52, letterSpacing: '-0.02em', margin: 0 }}>Чай и кухня</h1>
          {/* Location switcher */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => setOpen(o => !o)} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius)', padding: '11px 16px', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', fontSize: 14, cursor: 'pointer' }}>
              <span style={{ color: 'var(--text-faint)' }}>Ресторан:</span> {loc.name.replace('ChaiShopper ','')}
              <span style={{ color: 'var(--accent)' }}>▾</span>
            </button>
            {open && (
              <div style={{ position: 'absolute', top: 'calc(100% + 6px)', right: 0, minWidth: 260, background: 'var(--surface-card-hover)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-overlay)', overflow: 'hidden', zIndex: 20 }}>
                {Dm.locations.map(l => (
                  <div key={l.id} onClick={() => { setLoc(l); setOpen(false); }} style={{ padding: '13px 16px', cursor: 'pointer', borderBottom: '1px solid var(--border-subtle)', color: l.id === loc.id ? 'var(--accent)' : 'var(--text-secondary)', fontSize: 14 }}>
                    <div style={{ fontWeight: 500 }}>{l.name.replace('ChaiShopper ','')}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-faint)', marginTop: 3 }}>{l.address}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky category filter */}
      <div style={{ position: 'sticky', top: 76, zIndex: 10, background: 'var(--surface-overlay)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderBottom: '1px solid var(--border-subtle)', marginTop: 28 }}>
        <div style={{ ...wrap, padding: '14px 32px', display: 'flex', gap: 10 }}>
          {Dm.categories.map(c => {
            const on = c.id === cat;
            return (
              <button key={c.id} onClick={() => setCat(c.id)} style={{ padding: '9px 18px', borderRadius: 'var(--radius-pill)', fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 500, cursor: 'pointer',
                background: on ? 'var(--accent)' : 'transparent', color: on ? 'var(--text-on-gold)' : 'var(--text-secondary)', border: `1px solid ${on ? 'var(--accent)' : 'var(--border-subtle)'}`, transition: 'all var(--dur) var(--ease-out)' }}>
                {c.name}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ ...wrap, padding: '40px 32px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {items.map(m => <MenuItemCard key={m.id} {...m} />)}
        </div>
      </div>
      <Footer2 go={go} />
    </div>
  );
}

/* ── Locations ───────────────────────────────────────────── */
function Marker({ active }) {
  return (
    <svg width="40" height="52" viewBox="0 0 84 110" fill="none" style={{ filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.5))', transition: 'transform var(--dur) var(--ease-out)', transform: active ? 'scale(1.18)' : 'scale(1)' }}>
      <path d="M42 4C22 4 6 19 6 39c0 25 30 58 35 64 1 1 3 1 4 0 5-6 35-39 35-64C80 19 64 4 42 4Z" fill={active ? '#D4BA83' : '#C8A96E'} stroke="#0F0E0C" strokeOpacity="0.3" strokeWidth="2"/>
      <g stroke="#0F0E0C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M24 44c0-10 8-18 18-18s18 8 18 18c0 3-1 6-3 8H27c-2-2-3-5-3-8Z"/>
        <path d="M24 38c-6-1-11 1-14 5"/><path d="M60 36c6 0 9 4 9 9"/><path d="M42 26v-4"/>
      </g>
    </svg>
  );
}
function LocationsScreen({ go }) {
  const [sel, setSel] = React.useState(Dm.locations[0]);
  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 76px)' }}>
      {/* List */}
      <div style={{ width: 420, flexShrink: 0, borderRight: '1px solid var(--border-subtle)', padding: '40px 32px', overflowY: 'auto' }}>
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--accent)' }}>Наши точки</div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 40, letterSpacing: '-0.02em', margin: '14px 0 28px' }}>Где найти тишину</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {Dm.locations.map(l => {
            const on = l.id === sel.id;
            return (
              <div key={l.id} onClick={() => setSel(l)} style={{ padding: 18, borderRadius: 'var(--radius-md)', cursor: 'pointer', background: on ? 'var(--surface-card-hover)' : 'var(--surface-card)', border: `1px solid ${on ? 'var(--border-gold)' : 'var(--border-subtle)'}`, transition: 'all var(--dur) var(--ease-out)' }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 20, color: 'var(--text-primary)' }}>{l.name.replace('ChaiShopper ','')}</div>
                <div style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 8 }}>{l.address}</div>
                <div style={{ fontSize: 13, color: 'var(--text-faint)', marginTop: 4 }}>{l.hours}</div>
                {on && <div style={{ marginTop: 14, display: 'flex', gap: 10 }}><Button size="sm" variant="secondary" onClick={(e) => { e.stopPropagation(); go('location', l); }}>Подробнее</Button><Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); go('reservation'); }}>Забронировать</Button></div>}
              </div>
            );
          })}
        </div>
      </div>
      {/* Map */}
      <div style={{ flex: 1, position: 'relative', background: 'radial-gradient(110% 90% at 50% 30%, #1a1712, #0c0b09)', overflow: 'hidden' }}>
        {/* faux street grid */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.5,
          backgroundImage: 'linear-gradient(rgba(200,169,110,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,0.05) 1px, transparent 1px)',
          backgroundSize: '64px 64px' }} />
        {Dm.locations.map(l => (
          <div key={l.id} onClick={() => setSel(l)} style={{ position: 'absolute', left: `${l.x}%`, top: `${l.y}%`, transform: 'translate(-50%,-100%)', cursor: 'pointer' }}>
            <Marker active={l.id === sel.id} />
          </div>
        ))}
        {/* popup */}
        <div style={{ position: 'absolute', left: `${sel.x}%`, top: `${sel.y}%`, transform: 'translate(-50%, 14px)', width: 260 }}>
          <Card hover={false} style={{ background: 'var(--surface-card-hover)' }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18 }}>{sel.name.replace('ChaiShopper ','')}</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 6 }}>{sel.address}</div>
            <div style={{ fontSize: 13, color: 'var(--text-faint)', marginTop: 3 }}>{sel.phone}</div>
            <div style={{ marginTop: 12 }}><Button size="sm" variant="secondary" onClick={() => go('location', sel)}>Подробнее</Button></div>
          </Card>
        </div>
      </div>
    </div>
  );
}

window.MenuScreen = MenuScreen;
window.LocationsScreen = LocationsScreen;
