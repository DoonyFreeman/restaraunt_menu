import React from 'react';

/** Общие layout-хелперы страниц (из ui_kits/website/home.jsx). */

export const wrap: React.CSSProperties = { maxWidth: 1240, margin: '0 auto', padding: '0 32px' };

// .cs-eyebrow живёт в app/ds-tokens/base.css — единый источник стиля eyebrow.
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="cs-eyebrow">{children}</div>;
}

export function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 56px' }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 40, letterSpacing: '-0.02em', margin: '16px 0 0', color: 'var(--text-primary)' }}>{title}</h2>
      {sub && <p style={{ marginTop: 14, fontSize: 17, lineHeight: 1.6, color: 'var(--text-muted)' }}>{sub}</p>}
    </div>
  );
}
