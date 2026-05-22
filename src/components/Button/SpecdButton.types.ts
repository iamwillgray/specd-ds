export type ButtonVariant =
  | 'primary' | 'ghost' | 'accent' | 'danger'
  | 'sb-good' | 'sb-bad' | 'sb-muted'
  | 'ai-gradient'
  | 'row-primary' | 'row-primary-ghost' | 'row-applied'
  | 'edit-pill' | 'save-pill' | 'cancel-pill';
export type ButtonSize    = 'sm' | 'md' | 'lg';
export type ButtonType    = 'button' | 'submit' | 'reset';

export interface ButtonProps {
  /** Button label text. If omitted, slot content is used instead. */
  label?: string;
  /** Visual style variant. @default 'primary' */
  variant?: ButtonVariant;
  /** Size. @default 'md' */
  size?: ButtonSize;
  /** Stretch to full container width. @default false */
  full?: boolean;
  /** Disabled state — prevents interaction. @default false */
  disabled?: boolean;
  /** Loading state — shows spinner, prevents interaction. @default false */
  loading?: boolean;
  /** HTML button type attribute. @default 'button' */
  type?: ButtonType;
  /** Raw SVG string rendered before the label. */
  icon?: string;
  /** Extra CSS class(es) added to the inner button element. */
  cls?: string;
}
