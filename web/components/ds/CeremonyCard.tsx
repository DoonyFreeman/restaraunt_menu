import React from 'react';
import { Card } from './Card';
import { Button } from './Button';

/** Tea-ceremony card — atmospheric photo, duration/price meta, book CTA. */
export interface CeremonyCardProps {
  name: string;
  description?: string;
  /** Duration in minutes. */
  durationMin: number;
  /** Price in rubles. */
  price: number;
  /** CSS background value for the atmospheric photo. */
  image?: string;
  onBook?: () => void;
  style?: React.CSSProperties;
}

/**
 * Ceremony card: atmospheric photo, name, duration + price meta, CTA.
 * Used on /ceremonies grid and the home "Наши церемонии" section.
 */
export function CeremonyCard({ name, description, durationMin, price, image, onBook, style = {} }: CeremonyCardProps) {
  return (
    <Card padded={false} style={style}>
      <div
        style={{
          height: 220,
          background: image || 'linear-gradient(160deg, #35302A, #15130F)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'var(--scrim-bottom)' }} />
      </div>
      <div style={{ padding: 'var(--space-5)' }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', color: 'var(--text-muted)' }}>{durationMin} мин</span>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--text-faint)' }} />
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600, color: 'var(--accent)' }}>{price} ₽</span>
        </div>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 24, letterSpacing: '-0.01em', color: 'var(--text-primary)', margin: 0 }}>{name}</h3>
        {description && (
          <p style={{ marginTop: 10, fontFamily: 'var(--font-sans)', fontSize: 14, lineHeight: 1.6, color: 'var(--text-muted)' }}>{description}</p>
        )}
        <div style={{ marginTop: 20 }}>
          <Button variant="secondary" size="sm" onClick={onBook}>Забронировать</Button>
        </div>
      </div>
    </Card>
  );
}
