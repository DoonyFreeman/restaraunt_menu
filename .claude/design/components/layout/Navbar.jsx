import React from 'react';
import { Button } from '../core/Button.jsx';

/** Compact inline teapot mark so the navbar is self-contained in the bundle. */
function Mark({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" aria-hidden="true">
      <path d="M70 40c0-8 8-8 8-16s-8-8-8-16" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
      <path d="M44 86c0-19 16-34 36-34s36 15 36 34c0 6-2 11-5 16H49c-3-5-5-10-5-16Z" stroke="var(--accent)" strokeWidth="5" fill="none" strokeLinejoin="round" />
      <path d="M80 52v-8" stroke="var(--accent)" strokeWidth="5" strokeLinecap="round" />
      <circle cx="80" cy="42" r="4" fill="var(--accent)" />
      <path d="M44 70c-12-2-22 2-28 10" stroke="var(--accent)" strokeWidth="5" strokeLinecap="round" />
      <path d="M116 66c12 0 18 8 18 18" stroke="var(--accent)" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M50 118h60" stroke="var(--accent)" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Translucent dark navbar with backdrop blur. Logo left, nav center/right, CTA right.
 * `links` = [{ label, href, active }]. Pass `transparent` for hero overlays.
 */
export function Navbar({
  links = [
    { label: 'Меню', href: '/menu' },
    { label: 'Наши точки', href: '/locations' },
    { label: 'Церемонии', href: '/ceremonies' },
  ],
  ctaLabel = 'Забронировать',
  onCta,
  transparent = false,
  style = {},
}) {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        height: 'var(--navbar-h)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 var(--space-7)',
        background: transparent ? 'transparent' : 'var(--surface-overlay)',
        backdropFilter: transparent ? 'none' : 'blur(14px) saturate(1.1)',
        WebkitBackdropFilter: transparent ? 'none' : 'blur(14px) saturate(1.1)',
        borderBottom: `1px solid ${transparent ? 'transparent' : 'var(--border-subtle)'}`,
        fontFamily: 'var(--font-sans)',
        ...style,
      }}
    >
      <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
        <Mark />
        <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 22, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
          Chai<span style={{ fontWeight: 400, color: 'var(--accent)' }}>Shopper</span>
        </span>
      </a>

      <nav style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)' }}>
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            style={{
              fontSize: 15,
              fontWeight: 500,
              letterSpacing: '0.01em',
              color: l.active ? 'var(--accent)' : 'var(--text-secondary)',
              transition: 'color var(--dur) var(--ease-out)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = l.active ? 'var(--accent)' : 'var(--text-secondary)')}
          >
            {l.label}
          </a>
        ))}
        <Button variant="primary" size="sm" onClick={onCta}>{ctaLabel}</Button>
      </nav>
    </header>
  );
}
