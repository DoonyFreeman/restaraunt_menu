import * as React from 'react';

/** Dish card for the /menu grid — photo, name, description, price, tags. */
export interface MenuItemCardProps {
  name: string;
  description?: string;
  /** Price in rubles (number). Rendered as "{price} ₽". */
  price?: number;
  /** Any CSS background value for the photo — url(), gradient, etc. */
  image?: string;
  /** Attribute keys: 'veg' | 'spicy' | 'top'. */
  tags?: Array<'veg' | 'spicy' | 'top'>;
  style?: React.CSSProperties;
}

export function MenuItemCard(props: MenuItemCardProps): JSX.Element;
