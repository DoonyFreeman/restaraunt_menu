import * as React from 'react';

/** Primary action button for ChaiShopper. */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. @default 'primary' */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  /** Render as a different element, e.g. 'a'. @default 'button' */
  as?: any;
  children?: React.ReactNode;
}

export function Button(props: ButtonProps): JSX.Element;
