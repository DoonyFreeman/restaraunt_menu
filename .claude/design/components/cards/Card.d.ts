import * as React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Lift + deepen shadow on hover. @default true */
  hover?: boolean;
  /** Apply default 16px padding. @default true */
  padded?: boolean;
  children?: React.ReactNode;
}

/** Base dark surface card with soft shadow and hover lift. */
export function Card(props: CardProps): JSX.Element;
