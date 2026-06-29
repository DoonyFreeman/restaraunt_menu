import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  /** Error message — also turns the border chili-red. */
  error?: string;
}

/** Labeled text input on a dark well with a gold focus ring. */
export function Input(props: InputProps): JSX.Element;
