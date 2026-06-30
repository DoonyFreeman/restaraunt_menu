import React from 'react';
import Link from 'next/link';

export interface FooterLocation {
  name: string;
  slug: string;
}

export interface FooterProps {
  /** Locations listed in the "Точки" column. */
  locations?: FooterLocation[];
}

const wrap: React.CSSProperties = { maxWidth: 1240, margin: '0 auto', padding: '0 32px' };
const colTitle: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase',
  color: 'var(--text-faint)', marginBottom: 16,
};

function FootCol({ title, links }: { title: string; links: Array<[string, string]> }) {
  return (
    <div>
      <div style={colTitle}>{title}</div>
      {links.map(([label, href], i) => (
        <Link key={i} href={href} style={{ display: 'block', fontSize: 14, color: 'var(--text-secondary)', marginBottom: 10 }}>
          {label}
        </Link>
      ))}
    </div>
  );
}

/** Site footer — brand, navigation, locations, socials. Ported from the home kit. */
export function Footer({ locations = [] }: FooterProps) {
  return (
    <footer style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-raised)', marginTop: 8 }}>
      <div style={{ ...wrap, padding: '64px 32px 40px', display: 'flex', justifyContent: 'space-between', gap: 48, flexWrap: 'wrap' }}>
        <div style={{ maxWidth: 300 }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 24, letterSpacing: '-0.02em' }}>
            Chai<span style={{ color: 'var(--accent)', fontWeight: 400 }}>Shopper</span>
          </div>
          <p style={{ marginTop: 14, fontSize: 14, lineHeight: 1.7, color: 'var(--text-faint)' }}>
            Городская азиатская чайная. Искусство чайной паузы — в центре города.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 64, flexWrap: 'wrap' }}>
          <FootCol title="Навигация" links={[['Меню', '/menu'], ['Наши точки', '/locations'], ['Церемонии', '/ceremonies'], ['Бронирование', '/reservation']]} />
          {locations.length > 0 && (
            <FootCol title="Точки" links={locations.map((l) => [l.name.replace('ChaiShopper ', ''), `/locations/${l.slug}`])} />
          )}
          <div>
            <div style={colTitle}>Соцсети</div>
            {['Telegram', 'Instagram', 'VK'].map((s) => (
              <div key={s} style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 10 }}>{s}</div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ ...wrap, padding: '0 32px 40px', fontSize: 12, color: 'var(--text-faint)' }}>
        © 2026 ChaiShopper. Сделано с тишиной.
      </div>
    </footer>
  );
}
