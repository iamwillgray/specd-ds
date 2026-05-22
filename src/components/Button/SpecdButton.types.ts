export type ButtonVariant =
  | 'primary' | 'ghost' | 'accent' | 'danger'
  | 'sb-good' | 'sb-bad' | 'sb-muted'
  | 'ai-gradient'
  | 'row-primary' | 'row-primary-ghost' | 'row-applied'
  | 'edit-pill' | 'save-pill' | 'cancel-pill';
export type ButtonSize    = 'sm' | 'md' | 'lg';
export type ButtonType    = 'button' | 'submit' | 'reset';

export interface ButtonProps {
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  full?: boolean;
  disabled?: boolean;
  loading?: boolean;
  type?: ButtonType;
  icon?: string;
  cls?: string;
}
