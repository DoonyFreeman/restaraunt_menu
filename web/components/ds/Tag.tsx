import React from 'react';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** @default 'neutral' */
  tone?: 'veg' | 'spicy' | 'top' | 'neutral' | 'gold';
  /** Show a leading dot. @default false */
  dot?: boolean;
  children?: React.ReactNode;
}

/**
 * Small label chip. Semantic tones map to menu attributes.
 * tone: veg | spicy | top | neutral | gold
 */
export function Tag({ children, tone = 'neutral', dot = false, style = {}, ...rest }: TagProps) {
  const tones: Record<string, React.CSSProperties> = {
    veg: { color: 'var(--tag-veg-fg)', background: 'var(--tag-veg-bg)' },
    spicy: { color: 'var(--tag-spicy-fg)', background: 'var(--tag-spicy-bg)' },
    top: { color: 'var(--tag-top-fg)', background: 'var(--tag-top-bg)' },
    gold: { color: 'var(--text-on-gold)', background: 'var(--accent)' },
    neutral: { color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)' },
  };
  const t = tones[tone] || tones.neutral;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '5px 11px',
        borderRadius: 'var(--radius-pill)',
        fontFamily: 'var(--font-sans)',
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: '0.01em',
        lineHeight: 1,
        ...t,
        ...style,
      }}
      {...rest}
    >
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />}
      {children}
    </span>
  );
}
