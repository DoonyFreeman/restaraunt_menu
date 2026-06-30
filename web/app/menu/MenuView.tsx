'use client';

import React from 'react';
import { MenuItemCard } from '@/components/ds';
import { wrap, Eyebrow } from '@/components/site/Section';
import { shortName, type Category, type Location, type MenuItem } from '@/lib/seed';

interface Props {
  menu: MenuItem[];
  categories: Category[];
  locations: Location[];
}

export function MenuView({ menu, categories, locations }: Props) {
  const [cat, setCat] = React.useState('all');
  const [loc, setLoc] = React.useState<Location>(locations[0]);
  const [open, setOpen] = React.useState(false);
  const items = cat === 'all' ? menu : menu.filter((m) => m.cat === cat);

  return (
    <div>
      <div style={{ ...wrap, padding: '56px 32px 0' }}>
        <Eyebrow>Меню</Eyebrow>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap', marginTop: 14 }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 52, letterSpacing: '-0.02em', margin: 0 }}>Чай и кухня</h1>
          {/* Location switcher */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => setOpen((o) => !o)} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius)', padding: '11px 16px', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', fontSize: 14, cursor: 'pointer' }}>
              <span style={{ color: 'var(--text-faint)' }}>Ресторан:</span> {shortName(loc.name)}
              <span style={{ color: 'var(--accent)' }}>▾</span>
            </button>
            {open && (
              <div style={{ position: 'absolute', top: 'calc(100% + 6px)', right: 0, minWidth: 260, background: 'var(--surface-card-hover)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-overlay)', overflow: 'hidden', zIndex: 20 }}>
                {locations.map((l) => (
                  <div key={l.id} onClick={() => { setLoc(l); setOpen(false); }} style={{ padding: '13px 16px', cursor: 'pointer', borderBottom: '1px solid var(--border-subtle)', color: l.id === loc.id ? 'var(--accent)' : 'var(--text-secondary)', fontSize: 14 }}>
                    <div style={{ fontWeight: 500 }}>{shortName(l.name)}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-faint)', marginTop: 3 }}>{l.address}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky category filter */}
      <div style={{ position: 'sticky', top: 'var(--navbar-h)', zIndex: 10, background: 'var(--surface-overlay)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderBottom: '1px solid var(--border-subtle)', marginTop: 28 }}>
        <div style={{ ...wrap, padding: '14px 32px', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {categories.map((c) => {
            const on = c.id === cat;
            return (
              <button key={c.id} onClick={() => setCat(c.id)} style={{ padding: '9px 18px', borderRadius: 'var(--radius-pill)', fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 500, cursor: 'pointer', background: on ? 'var(--accent)' : 'transparent', color: on ? 'var(--text-on-gold)' : 'var(--text-secondary)', border: `1px solid ${on ? 'var(--accent)' : 'var(--border-subtle)'}`, transition: 'all var(--dur) var(--ease-out)' }}>
                {c.name}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ ...wrap, padding: '40px 32px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {items.map((m) => (
            <MenuItemCard key={m.id} {...m} />
          ))}
        </div>
      </div>
    </div>
  );
}
