import React from 'react';
import { Card } from './Card.jsx';
import { Tag } from '../core/Tag.jsx';

/**
 * Menu dish card: photo on top, name / description / price, attribute tags.
 * `image` is any CSS background value (url(), gradient). Falls back to a warm texture.
 */
export function MenuItemCard({ name, description, price, image, tags = [], style = {} }) {
  const toneFor = { veg: 'veg', spicy: 'spicy', top: 'top' };
  const labelFor = { veg: 'Вегет.', spicy: 'Острое', top: 'Хит' };
  return (
    <Card padded={false} style={style}>
      <div
        style={{
          height: 168,
          background: image || 'linear-gradient(135deg, #2A2520, #1E1B16)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        {tags.length > 0 && (
          <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6 }}>
            {tags.map((t) => (
              <Tag key={t} tone={toneFor[t] || 'neutral'} dot={t !== 'top'}>{labelFor[t] || t}</Tag>
            ))}
          </div>
        )}
      </div>
      <div style={{ padding: 'var(--space-4)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 20, letterSpacing: '-0.01em', color: 'var(--text-primary)', margin: 0 }}>{name}</h3>
          {price != null && (
            <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 16, color: 'var(--accent)', whiteSpace: 'nowrap' }}>{price} ₽</span>
          )}
        </div>
        {description && (
          <p style={{ marginTop: 8, fontFamily: 'var(--font-sans)', fontSize: 14, lineHeight: 1.6, color: 'var(--text-muted)' }}>{description}</p>
        )}
      </div>
    </Card>
  );
}
