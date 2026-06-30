'use client';

import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  /** Error message — also turns the border chili-red. */
  error?: string;
}

/** Dark-well text input with gold focus ring. */
export function Input({ label, hint, error, id, style = {}, ...rest }: InputProps) {
  const inputId = id || (label ? `in-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const [focus, setFocus] = React.useState(false);
  return (
    <label htmlFor={inputId} style={{ display: 'flex', flexDirection: 'column', gap: 7, fontFamily: 'var(--font-sans)' }}>
      {label && (
        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', letterSpacing: '0.01em' }}>{label}</span>
      )}
      <input
        id={inputId}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          width: '100%',
          padding: '12px 14px',
          background: 'var(--bg-well)',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-sans)',
          fontSize: 15,
          border: `1px solid ${error ? 'var(--chili-500)' : focus ? 'var(--accent)' : 'var(--border-subtle)'}`,
          borderRadius: 'var(--radius)',
          outline: 'none',
          boxShadow: focus ? '0 0 0 3px var(--focus-ring)' : 'var(--shadow-inset)',
          transition: 'border-color var(--dur) var(--ease-out), box-shadow var(--dur) var(--ease-out)',
          boxSizing: 'border-box',
          ...style,
        }}
        {...rest}
      />
      {(hint || error) && (
        <span style={{ fontSize: 12, color: error ? 'var(--chili-500)' : 'var(--text-faint)' }}>{error || hint}</span>
      )}
    </label>
  );
}
