import React from 'react';

/**
 * Base surface card. Dark clay surface, soft shadow, optional hover lift.
 * Compose richer cards (menu, ceremony) on top of this.
 */
export function Card({ children, hover = true, padded = true, style = {}, ...rest }) {
  const [over, setOver] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setOver(true)}
      onMouseLeave={() => setOver(false)}
      style={{
        background: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: padded ? 'var(--space-4)' : 0,
        boxShadow: hover && over ? 'var(--shadow-card-hover)' : 'var(--shadow-card)',
        transform: hover && over ? 'translateY(var(--lift))' : 'translateY(0)',
        transition: 'transform var(--dur) var(--ease-out), box-shadow var(--dur) var(--ease-out), border-color var(--dur) var(--ease-out)',
        borderColor: hover && over ? 'var(--border-strong)' : 'var(--border-subtle)',
        overflow: 'hidden',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
