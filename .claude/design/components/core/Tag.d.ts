import * as React from 'react';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** @default 'neutral' */
  tone?: 'veg' | 'spicy' | 'top' | 'neutral' | 'gold';
  /** Show a leading dot. @default false */
  dot?: boolean;
  children?: React.ReactNode;
}

/** Small pill label for menu attributes & metadata. */
export function Tag(props: TagProps): JSX.Element;
