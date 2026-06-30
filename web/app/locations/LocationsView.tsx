'use client';

import React from 'react';
import { Button, Card } from '@/components/ds';
import { Eyebrow } from '@/components/site/Section';
import { shortName, type Location } from '@/lib/seed';

function Marker({ active }: { active: boolean }) {
  return (
    <svg width="40" height="52" viewBox="0 0 84 110" fill="none" style={{ filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.5))', transition: 'transform var(--dur) var(--ease-out)', transform: active ? 'scale(1.18)' : 'scale(1)' }}>
      <path d="M42 4C22 4 6 19 6 39c0 25 30 58 35 64 1 1 3 1 4 0 5-6 35-39 35-64C80 19 64 4 42 4Z" fill={active ? '#D4BA83' : '#C8A96E'} stroke="#0F0E0C" strokeOpacity="0.3" strokeWidth="2" />
      <g stroke="#0F0E0C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M24 44c0-10 8-18 18-18s18 8 18 18c0 3-1 6-3 8H27c-2-2-3-5-3-8Z" />
        <path d="M24 38c-6-1-11 1-14 5" /><path d="M60 36c6 0 9 4 9 9" /><path d="M42 26v-4" />
      </g>
    </svg>
  );
}

export function LocationsView({ locations }: { locations: Location[] }) {
  const [sel, setSel] = React.useState<Location>(locations[0]);
  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - var(--navbar-h))', flexWrap: 'wrap' }}>
      {/* List */}
      <div style={{ width: 420, flexGrow: 1, flexShrink: 0, minWidth: 320, borderRight: '1px solid var(--border-subtle)', padding: '40px 32px', overflowY: 'auto' }}>
        <Eyebrow>Наши точки</Eyebrow>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 40, letterSpacing: '-0.02em', margin: '14px 0 28px' }}>Где найти тишину</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {locations.map((l) => {
            const on = l.id === sel.id;
            return (
              <div key={l.id} onClick={() => setSel(l)} style={{ padding: 18, borderRadius: 'var(--radius-md)', cursor: 'pointer', background: on ? 'var(--surface-card-hover)' : 'var(--surface-card)', border: `1px solid ${on ? 'var(--border-gold)' : 'var(--border-subtle)'}`, transition: 'all var(--dur) var(--ease-out)' }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 20, color: 'var(--text-primary)' }}>{shortName(l.name)}</div>
                <div style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 8 }}>{l.address}</div>
                <div style={{ fontSize: 13, color: 'var(--text-faint)', marginTop: 4 }}>{l.hours}</div>
                {on && (
                  <div style={{ marginTop: 14, display: 'flex', gap: 10 }}>
                    <Button href={`/locations/${l.slug}`} size="sm" variant="secondary">Подробнее</Button>
                    <Button href="/reservation" size="sm" variant="ghost">Забронировать</Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Faux map (Sprint 5 → Leaflet) */}
      <div style={{ flex: 1, minWidth: 320, position: 'relative', background: 'radial-gradient(110% 90% at 50% 30%, #1a1712, #0c0b09)', overflow: 'hidden', minHeight: 480 }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.5, backgroundImage: 'linear-gradient(rgba(200,169,110,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,0.05) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />
        {locations.map((l) => (
          <div key={l.id} onClick={() => setSel(l)} style={{ position: 'absolute', left: `${l.x}%`, top: `${l.y}%`, transform: 'translate(-50%,-100%)', cursor: 'pointer' }}>
            <Marker active={l.id === sel.id} />
          </div>
        ))}
        <div style={{ position: 'absolute', left: `${sel.x}%`, top: `${sel.y}%`, transform: 'translate(-50%, 14px)', width: 260 }}>
          <Card hover={false} style={{ background: 'var(--surface-card-hover)' }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18 }}>{shortName(sel.name)}</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 6 }}>{sel.address}</div>
            <div style={{ fontSize: 13, color: 'var(--text-faint)', marginTop: 3 }}>{sel.phone}</div>
            <div style={{ marginTop: 12 }}><Button href={`/locations/${sel.slug}`} size="sm" variant="secondary">Подробнее</Button></div>
          </Card>
        </div>
      </div>
    </div>
  );
}
