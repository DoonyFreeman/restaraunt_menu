import * as React from 'react';

export interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

/** Site navbar — translucent dark with backdrop blur, logo + nav + CTA. */
export interface NavbarProps {
  links?: NavLink[];
  /** CTA button label. @default 'Забронировать' */
  ctaLabel?: string;
  onCta?: () => void;
  /** Transparent overlay (no blur/border) for hero sections. @default false */
  transparent?: boolean;
  style?: React.CSSProperties;
}

export function Navbar(props: NavbarProps): JSX.Element;
