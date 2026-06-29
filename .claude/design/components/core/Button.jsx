import React from 'react';

/**
 * ChaiShopper Button.
 * primary  — matte gold fill, dark text (default CTA «Забронировать»)
 * secondary— transparent, gold hairline border
 * ghost    — text-only, gold on hover
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  as = 'button',
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { padding: '8px 16px', fontSize: 13 },
    md: { padding: '12px 24px', fontSize: 15 },
    lg: { padding: '16px 34px', fontSize: 17 },
  };

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    width: fullWidth ? '100%' : 'auto',
    border: '1px solid transparent',
    borderRadius: 'var(--radius)',
    fontFamily: 'var(--font-sans)',
    fontWeight: 600,
    letterSpacing: '0.01em',
    lineHeight: 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    transition: 'background var(--dur) var(--ease-out), border-color var(--dur) var(--ease-out), transform var(--dur-fast) var(--ease-out), color var(--dur) var(--ease-out)',
    ...sizes[size],
  };

  const variants = {
    primary: { background: 'var(--accent)', color: 'var(--text-on-gold)' },
    secondary: { background: 'transparent', color: 'var(--accent)', borderColor: 'var(--border-gold)' },
    ghost: { background: 'transparent', color: 'var(--text-secondary)' },
  };

  const hover = {
    primary: (e) => { if (!disabled) e.currentTarget.style.background = 'var(--accent-hover)'; },
    secondary: (e) => { if (!disabled) { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent-hover)'; } },
    ghost: (e) => { if (!disabled) e.currentTarget.style.color = 'var(--accent)'; },
  };
  const leave = {
    primary: (e) => { e.currentTarget.style.background = 'var(--accent)'; },
    secondary: (e) => { e.currentTarget.style.borderColor = 'var(--border-gold)'; e.currentTarget.style.color = 'var(--accent)'; },
    ghost: (e) => { e.currentTarget.style.color = 'var(--text-secondary)'; },
  };

  const Tag = as;
  return (
    <Tag
      disabled={as === 'button' ? disabled : undefined}
      style={{ ...base, ...variants[variant], ...style }}
      onMouseEnter={hover[variant]}
      onMouseLeave={leave[variant]}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = 'translateY(1px)'; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </Tag>
  );
}
