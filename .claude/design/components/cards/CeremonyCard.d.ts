import * as React from 'react';

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

export function CeremonyCard(props: CeremonyCardProps): JSX.Element;
